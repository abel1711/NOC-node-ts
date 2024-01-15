import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('mongo-log.datasource', () => {
    const logDatasource = new MongoLogDatasource();
    const log = new LogEntity({
        message: 'Test',
        level: LogSeverityLevel.low,
        origin: 'mongo-log.datasource.test.ts',
    });
    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });
    afterEach(async()=>{
        await LogModel.deleteMany();
    });
    afterAll(async () => {
        mongoose.connection.close();
    });
    test('should create a log', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await logDatasource.saveLog(log);
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith( expect.stringContaining("MongoLog created:"));
    });

    test('should get logs', async() => { 
        await logDatasource.saveLog(log);
        await logDatasource.saveLog(log);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
     })
});