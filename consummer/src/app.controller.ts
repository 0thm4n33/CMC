import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('panel_notification')
  public async getNotification(@Ctx() context:RmqContext){
    const notificationContent = JSON.parse(context.getMessage().content);
    const { start, end, message } = notificationContent.data;
    console.log(`start date : ${start}`)
    this.appService.scheduleJob(message,start,end);
  }

}
