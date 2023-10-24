import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {MessageEntity} from "./message/message.entity";
import {AnimationType} from "./message/enums/animation-type.enum";
import {EventPattern, MessagePattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/panel")
  @Render('panel')
  getPanel() {
    return {message : 'ready to broadcast', couleur:'red',animation:'tradtionnal'};
  }
}
