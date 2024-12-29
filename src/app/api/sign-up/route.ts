import dbConnect from "@/lib/dbConnect";
import sendVerificationEmail, { sendMailerSendEmail, sendMailgunEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
// import { hash } from "crypto";


export async function  POST(req:Request) {
    await dbConnect();


    try {

        const {username,email,password} = await req.json()


        // checking for existing username 
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerifed:true
        })

        if(existingVerifiedUser){
            
            return Response.json({
                success:false,
                message:"Username already exists"
            },{
                status:400,
                // statusText:""
            })
        }
        
        // checking for existing user with same email
        const existingUser = await UserModel.findOne({email})

        // generating one time password
        const verifyOTP = parseInt((Math.random() * 900000 ).toString(),10) +100000
        
        if(existingUser){
            if (existingUser.isVerifed) {
                return Response.json({
                    success:false,
                    message:"User already exists with same email"
                },{
                    status:400
                })
            } else {
                const hashPassword = await bcrypt.hash(password,10)
                existingUser.password = hashPassword
                existingUser.verifyCode = verifyOTP.toString()
                existingUser.verifyCodeExpiry = new Date(Date.now()+ 3600000)
                await existingUser.save()

            }
        }else{
            const hashPass = await bcrypt.hash(password,10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                email,
                username,
                password:hashPass,
                isVerifed:false,
                verifyCode:verifyOTP,
                verifyCodeExpiry:new Date(Date.now()+ 3600000),
                isAcceptingMessages:true,
                messages: []

             })

             await newUser.save()


        }

        const emailReciept = await sendVerificationEmail(email,verifyOTP.toString(),username)
        // const emailReciept = await sendMailgunEmail(email,verifyOTP.toString(),username)
        // const emailReciept = await sendMailerSendEmail(email,verifyOTP.toString(),username)
        console.log("Email Reciept",emailReciept);
        if (emailReciept){
            if(emailReciept.success){
                return Response.json(
                    {
                      success: true,
                      message: 'User registered successfully. Please verify your account.',
                    },
                    { status: 201 }
                  );
            }else{
                return Response.json(
                    {
                      success: false,
                      message: emailReciept.message,
                    },
                    { status: 500 }
                  );
            }
        }

    } catch (error) {
        console.log(`Error Occured duing Registering User ${error}`);
        return Response.json({
            success:false,
            message:"Error registering user"
        },{
            status:500
        })
        
    }
}