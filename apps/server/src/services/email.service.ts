import { Resend } from 'resend';
import { env } from '@src/config/env';
import log from '@src/logger';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    log.error({ err }, 'Failed to send email');
    throw err;
  }
}

export async function sendInvitationEmail(
  to: string,
  firstName: string,
  lastName: string,
  token: string,
) {
  const invitationUrl = `${env.FRONTEND_URL}/set-password/${token}`;

  const subject = "You've been invited to join RealtyComps";

  const html = `
    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: white; padding: 30px; border: 1px solid #e9ecef; }
            .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
            }
            .footer { 
            background-color: #f8f9fa; 
            padding: 20px; 
            border-radius: 0 0 8px 8px; 
            font-size: 14px; 
            color: #6c757d; 
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1 style="margin: 0; color: #212529;">Welcome to RealtyComps</h1>
            </div>
            <div class="content">
            <p>Hi ${firstName} ${lastName},</p>
            
            <p>You have been invited to join <strong>RealtyComps</strong>.</p>
            
            <p>To get started, please click the button below to set up your password:</p>
            
            <a href="${invitationUrl}" class="button">Set Up Your Account</a>
            
            <p>This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.</p>
            
            <p style="margin-top: 30px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <span style="color: #007bff; word-break: break-all;">${invitationUrl}</span>
            </p>
            </div>
            <div class="footer">
            <p style="margin: 0;">This is an automated email from RealtyComps. Please do not reply.</p>
            </div>
        </div>
        </body>
    </html>
  `;

  return await sendEmail(to, subject, html);
}
