import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { authOption } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


interface params {
    messageid:string
}


export async function DELETE(req:Request,params:params) {
    
    await dbConnect();
    
    try {
    //checking for auth
    const session = await getServerSession(authOption);
    if(!session || !session.user ){
        return Response.json({
            success : false,
            message:"User is not logged in , Please log in"
        },{
            status:400
        })
    } 
    
    const messageId = params.messageid
    const username = session.user.username 

    const updatedUser = await UserModel.updateOne({
        username
    },{
        $pull:{messages:{_id:messageId}}
    })

    if(updatedUser.modifiedCount === 0){
        return Response.json({
            success : false,
            message:"Unable to delete User's message or already deleted"
        },{
            status:404
        })
    }

    return Response.json({
        success : true,
        message:"message successfully deleted"
    },{
        status:200
    })

    } catch (error) {
        console.log("Some internal Server error Occured :: ",error);
        return Response.json({
            success : false,
            message:"Some internal Server error Occured"
        },{
            status:500
        })
        
    }
}