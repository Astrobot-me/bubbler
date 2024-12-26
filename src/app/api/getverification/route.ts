import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { validateUsername } from "@/schemas/userValidator";
import { z } from "zod";



export async function GET(req:Request) {
    await dbConnect();
    const userQuerySchema = z.object({
        username:validateUsername
    })


    try {

        let {searchParams} = new URL(req.url)
        // searchParams = 

        const queryParams = {
            username:searchParams.get('username')
        }

        const validateUsername = userQuerySchema.safeParse(queryParams)

        if(!validateUsername.success){

            const usernameError = validateUsername.error?.format()?.username?._errors || []
            // console.log('usernameError ', validateUsername.error?.format())

            return Response.json({
                success:false,
                message: usernameError?.length > 0 ? usernameError.join(",") : "Invalid username obtained"
            },{
                status : 400
            })

        }

        const userInDb = await UserModel.findOne({
            username:queryParams.username
        })
        
        if(!userInDb){
            
            return Response.json({
                success:false,
                message:"Invalid username!"
            },{
                status:400
            })
        }

        return Response.json({
            success:true,
            message:userInDb.isVerifed
        },{
            status:200
        })


    } catch (error) {
        console.log("Error Occured verification state fetching",error)
        return Response.json({
            success:false,
            message:"Error Occured verification state fetching"
        },{
            status:500
        })
    }
}