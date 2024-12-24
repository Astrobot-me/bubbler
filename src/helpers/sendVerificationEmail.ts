import EmailTemplate from "../../emails/emailTemplate";
import apiResponse from "@/types/apiResponse";
import { resendClient } from "@/lib/resendClient";


export default async function sendVerificationEmail(
    email:string,
    otp:string,
    username:string,

) : Promise<apiResponse> {
    try {
        await resendClient.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verification code for bubler",
            react: EmailTemplate ({email, username:username, otp:otp}),
          })
          return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email.' };
    }
}