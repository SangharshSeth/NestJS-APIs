import { IsDate, IsEnum, IsNotEmpty } from "class-validator";


export enum LogTypeEnum {
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    INFO = 'INFO',
    DEBUG = 'DEBUG',
}

export class LogDto {
    @IsNotEmpty()
    log: string;

    @IsEnum(LogTypeEnum)
    type: LogTypeEnum;
}