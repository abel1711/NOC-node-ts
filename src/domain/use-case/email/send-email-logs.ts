import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute(to: string | string[]): Promise<boolean>;
}


export class SendLogsEmail implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]): Promise<boolean> {

        try {
            const send = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!send) {
                throw new Error('Email log not sent');
            };

            this.logRepository.saveLog(new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts'
            }));
            return true;
        } catch (error) {
            this.logRepository.saveLog(new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            }));
            return false;
        }

    }

}