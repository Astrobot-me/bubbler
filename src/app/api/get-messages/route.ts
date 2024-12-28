import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { authOption } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(req:Request) {
    
    await dbConnect();

    try {
        const session = await getServerSession(authOption);
        const _user :User = session?.user
        
        if(!session || !_user){
            return Response.json({
                success : false,
                message:"User not Logged in ! Please log in"
            },{
                status:400
            })
        }

        const userId = new mongoose.Types.ObjectId(_user._id)
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.timestamp': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
        ]).exec();
        
        // console.log("user",user);

        if (!user) {
        return Response.json(
            { message: 'User not found', success: false },
            { status: 404 }
        );
        }
        if (user.length === 0) {
        return Response.json(
            { message: "You don't have any messages ", success: false },
            { status: 200 }
        );
        }
    
        return Response.json(
        { messages: user[0].messages },
        {
            status: 200,
        }
        );

        
    } catch (error) {
        console.log("Some internal server Error Occure ::",error);
        
        return Response.json({
            success : false,
            message:"Some internal server Error Occured"
        },{
            status:500
        })
    }
}