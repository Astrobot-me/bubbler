import { Resend } from 'resend';

export const resendClient = new Resend(process.env.RESENT_CLIENT_SECRET)