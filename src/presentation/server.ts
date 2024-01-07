import { CheckService } from "../domain/use-case/checks/check-service";
import { SendLogsEmail } from "../domain/use-case/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');

        // new SendLogsEmail(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['abelamieva@gmail.com']
        // )
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://localhost:3000';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )
    }
}