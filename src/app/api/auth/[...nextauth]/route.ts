import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import { The_Girl_Next_Door } from "next/font/google";

export const authOption : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credential",  
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any,req):Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier.email},
                            {username:credentials.identifier.username},
                        ],
                    })

                    if(!user){
                        throw new Error("No user found with this email/username")
                    }
                    if(!user.isVerifed){
                        throw new Error("Please verify your account before logging in")
                    }

                    const isPassCorrect = bcrypt.compare(credentials.password,user.password)

                    if(!isPassCorrect){
                        throw new Error("Incorect password entered ")
                    }

                    return user


                } catch (error:any) {
                    throw new Error(error)
                }
            }  
        })

    ],
    callbacks:{
        async session({ session, token }) {
            if(token){
                session.user._id = token._id?.toString();
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session
        },
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }   

            return token
        }

    },
    secret:process.env.NEXTAUTH_SECRETCLIENT_KEY,
    pages:{
        signIn:"'/sign-in"
    },
    session:{
        strategy:"jwt"
    }

}
