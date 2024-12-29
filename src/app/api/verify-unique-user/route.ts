import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from 'zod';
import { validateUsername } from "@/schemas/userValidator"; 
// import { format } from "path";


const userQuerySchema = z.object({
    username:validateUsername
})

export async function GET(req:Request){
    
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url)

        const queryParams = {
            username:searchParams.get('username')
        }

        const validateUsername = userQuerySchema.safeParse(queryParams)
        // console.log("validateUsername", validateUsername)


        if(!validateUsername.success){

            const usernameError = validateUsername.error?.format()?.username?._errors || []
            // console.log('usernameError ', validateUsername.error?.format())

            return Response.json({
                success:false,
                message: usernameError?.length > 0 ? usernameError.join(",") : "Invalid username obtained"
            },{
                status : 400
            })

        }else{
            const username = validateUsername.data.username

            const userInDb = await UserModel.findOne({
                username,
                isVerifed:true
            })

            
            if(userInDb){
                
                return Response.json({
                    success:false,
                    message:"Username already exists"
                },{
                    status:200
                })
            }else{
                return Response.json({
                    success:true,
                    message:"Username is unique"
                },{
                    status:200
                })
            }

        }
    } catch (error:any) {
        console.error('Error checking username:', error);
        return Response.json({
            success:false,
            message:`Error Checking Username ${error}`
        },{
            status:500
        })
    }

}