import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PanelService} from "./panel.service";
import {ScheduleModule, SchedulerRegistry} from "@nestjs/schedule";

@Module({
  imports: [
      ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,PanelService,SchedulerRegistry],
})
export class AppModule {}
