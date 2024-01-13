import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';


const prismaClient = new PrismaClient();

const levelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = levelEnum[log.level];
        await prismaClient.logModel.create({
            data: {
                ...log,
                level
            }
        })

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = levelEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where: { level }
        })
        return logs.map(log => LogEntity.fromObject({
            ...log,
            level: log.level.toLowerCase()
        }));
    }

}
