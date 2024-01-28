import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('log.entity.ts', () => {
    const logData = {
        message: 'TEST-MESSAGE',
        origin: 'log.entity.test.ts',
        level: LogSeverityLevel.low
    }
    test('should create a LogEntity instance', () => {
        const newLog = new LogEntity(logData);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(logData.message);
        expect(newLog.level).toBe(logData.level);
        expect(newLog.origin).toBe(logData.origin);
        expect(newLog.createdAt).toBeInstanceOf(Date);
    });
    test('should create a LogEntity instance from json', () => { 
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-01-13T02:27:25.166Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
     });
     test('should create a LogEntity from object', () => { 
        const log = LogEntity.fromObject(logData);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
      })

})