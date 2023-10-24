import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SchedulerEntity} from "./scheduler.entity";
import {Repository} from "typeorm";
import {MessageEntity} from "../message/message.entity";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class SchedulerService {
     public NOTIFICAION_PATTERN = 'panel_notification';
    constructor(
        @InjectRepository(SchedulerEntity)
        private schedulerRepository:Repository<SchedulerEntity>,
        @InjectRepository(MessageEntity)
        private messageRepositroy:Repository<MessageEntity>,
        @Inject('notification-mq-module')
        private readonly client:ClientProxy
    ){}

    async create(messageId:number,schedule:SchedulerEntity):Promise<SchedulerEntity>{
        schedule.message = await this.validateSchedule(messageId);
        this.pushNotification(schedule);
        return this.schedulerRepository.save(schedule)
    }
    
    async validateSchedule(messageId: number){
        const message = await this.messageRepositroy.findOne({
            where:{
                id: messageId
            }
        })
        if(message == null){
            throw new HttpException({message: "Message Entity n'existe pas"},
                HttpStatus.BAD_REQUEST);
        }
        return message;
    }

    async find():Promise<SchedulerEntity[]>{
        return await this.schedulerRepository.find({
            relations:{
                message: true
            }
        });
    }

    pushNotification(scheduler:SchedulerEntity){
        this.client.send(this.NOTIFICAION_PATTERN,scheduler).subscribe((s)=>{
            console.log('pushed to queue')
        })
    }

    findOne(id: number):Promise<SchedulerEntity | null>{
        return this.schedulerRepository.findOneBy({id});
    }


}
