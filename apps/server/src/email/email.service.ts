import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { invitationEmailTemplate } from './templates/invitation.template';

@Injectable()
export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
    this.fromEmail = this.configService.get<string>(
      'RESEND_FROM_EMAIL',
      'onboarding@realtycomps.org',
    );
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
      });

      if (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      return data;
    } catch (err) {
      console.error('Error sending email:', err);
      throw err;
    }
  }

  async sendInvitationEmail(email: string, invitationToken: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const invitationUrl = `${frontendUrl}/set-password?token=${invitationToken}`;
    const html = invitationEmailTemplate(invitationUrl);
    return this.sendEmail(email, "You've Been Invited!", html);
  }
}
