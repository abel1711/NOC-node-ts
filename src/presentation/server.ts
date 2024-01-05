import { CheckService } from "../domain/use-case/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())


export class Server {
    public static start() {
        console.log('Server started...');

        // const emailIsSend = new EmailService().sendEmail({
        //     to: 'abelamieva@gmail.com',
        //     subject: 'hola desde node',
        //     htmlBody: `<h3>Hola desde Nodejs</h3>`
        // });
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