import EmailTemplate from "../../emails/emailTemplate";
import apiResponse from "@/types/apiResponse";
import { mailerSend, resendClient } from "@/lib/resendClient";
import { MailCheck } from "lucide-react";
import generateOtpEmailHtml from "../../emails/generateOTPEmail";
import { EmailParams, Recipient, Sender } from "mailersend";

export default async function sendVerificationEmail(
  email: string,
  otp: string,
  username: string
): Promise<apiResponse> {
  try {
    console.log("sending verificatio email");
    await resendClient.emails.send({
      from: "Bubbler <onboarding@rajaditya.me>",
      to: email,
      subject: "Verification code for Bubbler Messenger",
      react: EmailTemplate({ email, username: username, otp: otp }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
// export async function sendMailgunEmail(
//   email: string,
//   otp: string,
//   username: string
// ): Promise<apiResponse> {
//   try {
//     const html = generateOtpEmailHtml({ email, username, otp });
//     await MailgunClient.messages.create(
//       "sandbox576b2468abd743589767d6fcad40ec1a.mailgun.org",
//       {
//         from: "Excited User <mailgun@sandbox576b2468abd743589767d6fcad40ec1a.mailgun.org>",
//         to: [email],
//         subject: "Verification code for Bubbler Messenger",
//         text: "One Time Password of Account Email Verification!",
//         html: html,
//       }
//     );
//     return { success: true, message: "Verification email sent successfully." };
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     return { success: false, message: "Failed to send verification email." };
//   }
// }
export async function sendMailerSendEmail(
  email: string,
  otp: string,
  username: string
): Promise<apiResponse> {
  try {
    const html = generateOtpEmailHtml({ email, username, otp });
    const sentFrom = new Sender("bubblemessenger.run.place", "Bubbler Verification code");

    const recipients = [new Recipient(email, username)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml(`<h1>${otp}</h1>`)
      .setText("This is the text content");

    const response = await mailerSend.email.send(emailParams);

    console.log("Response ,", response.body);

    return { success: true, message: "Verification email sent successfully." };
  } catch (error:any) {
    console.error("Error sending verification email:", error.body);
    return { success: false, message: "Failed to send verification email." };
  }
}
