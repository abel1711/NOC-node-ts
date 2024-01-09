import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const { message, level, origin } = log;

        const newLog = await LogModel.create({
            message,
            level,
            origin
        });
        await newLog.save();
        console.log(`MongoLog created: ${newLog._id}`)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });
        return logs.map(LogEntity.fromObject);
    }

}