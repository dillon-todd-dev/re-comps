"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
const invitation_template_1 = require("./templates/invitation.template");
let EmailService = class EmailService {
    configService;
    resend;
    fromEmail;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('RESEND_API_KEY');
        this.resend = new resend_1.Resend(apiKey);
        this.fromEmail = this.configService.get('RESEND_FROM_EMAIL', 'onboarding@realtycomps.org');
    }
    async sendEmail(to, subject, html) {
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
        }
        catch (err) {
            console.error('Error sending email:', err);
            throw err;
        }
    }
    async sendInvitationEmail(email, invitationToken) {
        const frontendUrl = this.configService.get('FRONTEND_URL');
        const invitationUrl = `${frontendUrl}/set-password?token=${invitationToken}`;
        const html = (0, invitation_template_1.invitationEmailTemplate)(invitationUrl);
        return this.sendEmail(email, "You've Been Invited!", html);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map