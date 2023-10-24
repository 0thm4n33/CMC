import {IsEnum, IsNotEmpty, isNotEmpty, IsString} from "class-validator";
import {MessageEntity} from "../../message/message.entity";

export class ScheduleDto {
   @IsNotEmpty()
    message:MessageEntity
    @IsNotEmpty()
    start:Date
    @IsNotEmpty()
    end:Date
}