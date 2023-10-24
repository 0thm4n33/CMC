import { Module } from '@nestjs/common';
import {MessageService} from "./message.service";
import {MessageController} from "./controllers/message.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";

@Module({
    imports:[TypeOrmModule.forFeature([MessageEntity])],
    controllers:[MessageController],
    providers:[MessageService]
})
export class MessageModule {

}
