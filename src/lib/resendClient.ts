import { Resend } from 'resend';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { MailerSend } from "mailersend";

// Initialize Mailgun
const mailgun = new Mailgun(formData);

export const MailgunClient = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || "",
});

export const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_SECRET_KEY || "",
  });

export const resendClient = new Resend(process.env.RESENT_CLIENT_SECRET)