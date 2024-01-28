import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('log.repository.impl', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const logRepository = new LogRepositoryImpl(mockRepository);
    beforeAll(()=>{
        jest.clearAllMocks();
    })
    test('saveLog should call the datasource with arguments', async () => {
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test message',
            origin: 'log.repository.impl.test.ts'
        });
        await logRepository.saveLog(log);

        expect(mockRepository.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the datasource with arguments', async() => {
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockRepository.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    })
})