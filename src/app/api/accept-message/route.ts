import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { authOption } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import { User } from "next-auth";

export async function POST(req:Request) {
    
    await dbConnect();
    
    try {
        const session = await getServerSession(authOption)
        const user:User = session?.user

        if(!session || !session?.user ){
            return Response.json({
                success:false,
                message:"User is not logged in! Please log in"
            },{
                status:400
            })
        }

        const {acceptMessage} = await req.json()
        const userID = user?._id
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID ,
            {isAcceptingMessages:acceptMessage},
            {new: true}

        )

        if(!updatedUser){
            return Response.json({
                success:false,
                message:"Failed ! user couldn't be updated with current state "
            },{
                status:400
            })
        }

        return Response.json({
            success : true,
            message:"User is successfully updated with current state"
        },{
            status:200
        })


    } catch (error) {
        console.log("Some Error Occurred :: " ,error);
        return Response.json({
            success : false,
            message:"Some Internal server Error Occurred"
        },{
            status:500
        })
        
    }
}

export async function GET(req:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOption); 
        // console.log("Session, ", session);
        if(!session || !session?.user ){
            return Response.json({
                success : false,
                message:"User is not logged in! Please log in"
            },{
                status:400
            })
        }

        const user : User = session?.user
        const userId = user._id

        const userInDb = await UserModel.findById(userId)

        if(!userInDb){
            return Response.json({
                success : false,
                message:"Failed ! unable to find the user"
            },{
                status:400
            })
        }

        return Response.json({
            success : true,
            message:"user found",
            isAcceptingMessage : userInDb.isAcceptingMessages
        },{
            status:200
        })

    } catch (error) {
        console.log("Some Error Occurred :: " ,error);
        return Response.json({
            success : false,
            message:"Some Internal server Error Occurred"
        },{
            status:500
        })
    }
}