import { envs } from "./envs.plugin";

describe('test en envs.plugin.ts', () => {
    test('should return envs options', () => {
        expect(envs).toEqual({
            PROD: false,
            PORT: 3000,
            MAILER_EMAIL: 'abelamieva@gmail.com',
            MAILER_SECRET_KEY: 'tmlaqcdmvogtjmxx',
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://abel:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'abel',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC-TEST',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_PASSWORD: '123456789'
        })
    });
    test('should return error if PORT are a string', async() => { 
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
     })
});