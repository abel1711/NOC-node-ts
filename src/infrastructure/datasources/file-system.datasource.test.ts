import path from "path"
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('file-system.datasource', () => {

    const logPath = path.join(__dirname, '../../../logs');

    // beforeEach(() => {

    //     if(fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
    // });

    test('should create log files if they do not exist', () => {
        if (fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
    });
    test('should save a log in logs-all.log files', () => {
        if (fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
        const logDatasource = new FileSystemDatasource();
        const pathFile = `${logPath}/logs-all.log`;
        const log = new LogEntity({
            message: 'test message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });
        logDatasource.saveLog(log);
        const file = fs.readFileSync(pathFile, { encoding: 'utf-8' });
        expect(file).toContain(JSON.stringify(log));
    });
    test('should save a log in logs-medium.log files', () => {
        if (fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
        const logDatasource = new FileSystemDatasource();
        const pathFile = `${logPath}/logs-medium.log`;
        const log = new LogEntity({
            message: 'test message-medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });
        logDatasource.saveLog(log);
        const file = fs.readFileSync(pathFile, { encoding: 'utf-8' });
        expect(file).toContain(JSON.stringify(log));
    });
    test('should save a log in logs-high.log files', () => {
        if (fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
        const logDatasource = new FileSystemDatasource();
        const pathFile = `${logPath}/logs-high.log`;
        const log = new LogEntity({
            message: 'test message-high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });
        logDatasource.saveLog(log);
        const file = fs.readFileSync(pathFile, { encoding: 'utf-8' });
        expect(file).toContain(JSON.stringify(log));
    });
    test('should return all logs', async () => {
        if (fs.existsSync(logPath)) fs.rmSync(logPath, { recursive: true, force: true });
        const logDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            message: 'test message-low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });
        const logMedium = new LogEntity({
            message: 'test message-medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });
        const logHigh = new LogEntity({
            message: 'test message-high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const allLogs = await logDatasource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(allLogs).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]));
        expect(highLogs).toEqual(expect.arrayContaining([logHigh]));
    });
    test('should not throw an error if path exists', () => {
        new FileSystemDatasource();
        new FileSystemDatasource();
        expect(true).toBeTruthy();
    });
});