import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { use } from 'passport';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService ) {}

    async sendUserEmail(user: string, verificationToken: string, email: string) {
        try {
            const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
    
            await this.mailerService.sendMail({
                to: email,
                from: '"Techly Africa Support Team" <support@example.com>',
                subject: 'MPA-CASH Account Verification',
                text: `Hi ${user},\n\nWelcome to MPA-CASH! We're excited to have you on board. To ensure the security of your account and access all the features of our platform, please verify your email address by clicking the link below:\n\n${verificationLink}\n\nThis link will expire in 24 hours, so please verify your email address as soon as possible.\n\nIf you didn't sign up for MPA-CASH or believe you received this email by mistake, please ignore it. Your account will not be activated until you verify your email.\n\nBest regards,\nTechly Africa Team`,
                html: `
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                        <div style="background-color: #fff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                            <h2 style="color: #333;">Email Verification</h2>
                            <p style="font-size: 16px; color: #555;">Hi ${user},</p>
                            <p style="font-size: 16px; color: #555;">Welcome to MPA-CASH! We're excited to have you on board. To ensure the security of your account and access all the features of our platform, please verify your email address by clicking the link below:</p>
                            <a href="${verificationLink}" style="background-color: #f9f9f9; display: inline-block; padding: 10px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; color: #2678d0; text-decoration: none;">
                               EmailVerification
                            </a>
                            <p style="font-size: 16px; color: #555;">This link will expire in 24 hours, so please verify your email address as soon as possible.</p>
                            <p style="font-size: 16px; color: #555;">If you didn't sign up for MPA-CASH or believe you received this email by mistake, please ignore it. Your account will not be activated until you verify your email.</p>
                            <p style="font-size: 16px; color: #555;">Best regards,<br>Techly Africa Team</p>
                        </div>
                    </body>
                `,
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    
    
    
}
