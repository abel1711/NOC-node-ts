import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('check-service.ts', () => {

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const errorCallback = jest.fn();
    const successCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback,
    )
    test('should call successCallback when fetch return true', async () => {
        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(errorCallback).not.toHaveBeenCalled();
        expect(successCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
    test('should call errorCallback when fetch return false', async () => {
        const wasOk = await checkService.execute('https://google.coomm');
        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
})