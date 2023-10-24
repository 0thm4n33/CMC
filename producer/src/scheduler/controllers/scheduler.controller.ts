import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SchedulerService} from "../scheduler.service";
import {SchedulerEntity} from "../scheduler.entity";

@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly scheduleService:SchedulerService) {
    }

    @Post('create/:messageId')
    async create( @Param("messageId") messageId: number,@Body() schedule:SchedulerEntity){
        console.log('messageid: '+messageId);
        return this.scheduleService.create(messageId,schedule);
    }

    @Get()
    async get(){
        return await this.scheduleService.find();
    }
}
