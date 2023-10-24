import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchedulerEntity} from "./scheduler.entity";
import { SchedulerController } from './controllers/scheduler.controller';
import { SchedulerService } from './scheduler.service';
import {MessageEntity} from "../message/message.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports:[
        ClientsModule.register([{
            name: 'notification-mq-module',
            transport: Transport.RMQ,
            options:{
                urls: ['amqp://localhost:5672'],
                queue:'panel_notification',
                queueOptions:{
                    durable: true
                }
            },
        }]),
        TypeOrmModule.forFeature([SchedulerEntity,MessageEntity])
    ],
    controllers: [SchedulerController],
    providers: [SchedulerService]
})
export class SchedulerModule {}
