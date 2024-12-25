import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/User";
import UserModel from "@/models/User";

export async function POST(req:Request) {
    
    await dbConnect();

    try {

        const {username,message} = await req.json();

        const entry = {content : message , timestamp:new Date()}

        const userInDb = await UserModel.findOne({
            username
        })
        
        if(!userInDb){
            return Response.json({
                success : false,
                message:"Failed ! , Unable to find User"
            },{
                status:400
            })
        }

        if(!userInDb.isAcceptingMessages){
            return Response.json({
                success : false,
                message:"User is not accepting messages anymore"
            },{
                status:200
            })
        }

        userInDb.messages.push(entry as Message)
        await userInDb.save()

        return Response.json({
            success : true,
            message:"Message is sucessfully sent to the user"
        },{
            status:200
        })


    } catch (error) {
        console.log("Some Error Occured :: ", error);
        
        return Response.json({
            success : false,
            message:"Some internal server Error Occured"
        },{
            status:500
        })
    }
}