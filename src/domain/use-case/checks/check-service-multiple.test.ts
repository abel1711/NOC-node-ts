import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('check-service-multiple.ts', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const errorCallback = jest.fn();
    const successCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        successCallback,
        errorCallback,
    )
    test('should call successCallback when fetch return true', async () => {
        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(errorCallback).not.toHaveBeenCalled();
        expect(successCallback).toHaveBeenCalled();
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
    test('should call errorCallback when fetch return false', async () => {
        const wasOk = await checkService.execute('https://google.coomm');
        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
})