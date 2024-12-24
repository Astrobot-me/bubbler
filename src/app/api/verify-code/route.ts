import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export async function POST(req:Request){
    await dbConnect();
    try {

        const {username,verifyCode} = await req.json();
        const decodedUsername = decodeURIComponent(username);
        // console.log("username", decodedUsername)
        const userInDb = await UserModel.findOne({
            username:decodedUsername
        })
        

        if(!userInDb){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:400
            })
        }

        if(userInDb.isVerifed){
            return Response.json({
                success:false,
                message:"User is already verified"
            },{
                status:400
            })
        }

        // console.log(typeof verifyCode)
        const isCodeSame = userInDb.verifyCode === verifyCode
        const isCodeValid = new Date(userInDb.verifyCodeExpiry) > new Date()

        if(isCodeSame && isCodeValid){
            userInDb.isVerifed = true
            await userInDb.save()

            return Response.json({
                success:true,
                message:"User is successfully verified"
            },{
                status:200
            })

        }else if(!isCodeValid){
            return Response.json({
                success:false,
                message:"verification code is expired"
            },{
                status:400
            })
        }else if(!isCodeSame){
            return Response.json({
                success:false,
                message:"verification code dosen't match "
            },{
                status:400
            })
        }

    } catch (error) {
        console.log("Error Occured during otp verification")
        return Response.json({
            success:500,
            message:"Error Occured during otp verification"
        },{
            status:500
        })
    }
}