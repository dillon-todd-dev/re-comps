import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private resend;
    private fromEmail;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendInvitationEmail(email: string, invitationToken: string): Promise<import("resend").CreateEmailResponseSuccess>;
}
