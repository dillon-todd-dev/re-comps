"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationEmailTemplate = void 0;
const invitationEmailTemplate = (invitationUrl) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're Invited!</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #4F46E5, #7C3AED); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Welcome to RealtyComps</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1f2937; margin-top: 0;">You've Been Invited!</h2>
        
        <p style="font-size: 16px; color: #4b5563;">
            You've been invited to join our real estate platform. Click the button below to set your password and get started.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${invitationUrl}" 
                style="background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Set Your Password
            </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
            Or copy and paste this link into your browser:
        </p>
        <p style="font-size: 14px; color: #4F46E5; word-break: break-all;">
            ${invitationUrl}
        </p>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            This invitation link will expire in 7 days.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            If you didn't expect this invitation, you can safely ignore this email.
        </p>
        </div>
    </body>
    </html>
`;
exports.invitationEmailTemplate = invitationEmailTemplate;
//# sourceMappingURL=invitation.template.js.map