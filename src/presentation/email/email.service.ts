import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachements[];
}

export interface Attachements {
    filename: string;
    path: string;
}


export class EmailService {


    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { htmlBody, subject, to, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const sendOptions: SendEmailOptions = {
            to,
            subject: 'Logs del sistema - NOC',
            htmlBody: `<h3>Logs del sistema - NOC </h3><p>Estos son los logs del sistema enviados por nodejs</p>`,
            attachments: [
                { filename: 'logs-all.log', path: 'logs/logs-all.log' },
                { filename: 'logs-high.log', path: 'logs/logs-high.log' },
                { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
            ]
        }

        return this.sendEmail(sendOptions);
    }


}