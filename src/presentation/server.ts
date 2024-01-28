import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-case/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-case/checks/check-service-multiple";
import { SendLogsEmail } from "../domain/use-case/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');

        // new SendLogsEmail(
        //     emailService,
        //     logRepository
        // ).execute(
        //     ['abelamieva@gmail.com']
        // )

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs)
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckServiceMultiple(
        //             [
        //                 postgresLogRepository,
        //                 mongoLogRepository,
        //                 fsLogRepository,
        //             ],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )
    }
}