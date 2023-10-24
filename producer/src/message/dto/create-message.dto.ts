import {AnimationType} from "../enums/animation-type.enum";
import {IsEnum, IsNotEmpty, isNotEmpty, IsString} from "class-validator";

export class CreateMessageDTO {
    @IsString()
    @IsNotEmpty()
    readonly message: string;
    @IsString()
    @IsNotEmpty()
    readonly coleur: string;
    @IsEnum(AnimationType)
    readonly animation: AnimationType;
}