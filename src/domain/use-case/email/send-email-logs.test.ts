import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendLogsEmail } from "./send-email-logs"

describe('send-email-service', () => {
    const mockRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockEmailService = {sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true)};
    const sendEmailLogs = new SendLogsEmail(
        mockEmailService as any,
        mockRepository
    );
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should call sendEmail and saveLog', async () => {
        const isOk = await sendEmailLogs.execute('abelamieva@gmail.com');
        expect(isOk).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts"
        });
    });
    test('should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        const isOk = await sendEmailLogs.execute('abelamieva@gmail.com');
        expect(isOk).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts"
        });
    });
});