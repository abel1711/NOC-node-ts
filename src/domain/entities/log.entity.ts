
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
};

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;
    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }
    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        return new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });
    }
    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const {
            message,
            level,
            origin,
            createdAt
        } = object;

        return new LogEntity({
            message,
            level,
            origin,
            createdAt
        });
    }
}