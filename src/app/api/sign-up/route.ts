import dbConnect from "@/lib/dbConnect";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';


export async function  POST(req:Request) {
    await dbConnect();

    try {
        
    } catch (error) {
        
    }
}