import { Injectable } from '@nestjs/common';
import {PanelService} from "./panel.service";
import {IMessage} from "./message.interface";
import {SchedulerRegistry} from "@nestjs/schedule";
import { CronJob } from 'cron';

@Injectable()
export class AppService {
  constructor(
      private scheduleRegistry:SchedulerRegistry,
      private readonly panel:PanelService) {
  }

  scheduleJob(message:IMessage,start:string,end:string){
    const startTime = this.toCronTime(start);
    const jobName = `job-notification-${start}`;
    const job = new CronJob(startTime,()=>{
      console.log('job lunched ...');
      this.panel.send(message);
    })
    this.scheduleRegistry.addCronJob(jobName,job);
    job.start();
    console.log(`start time: ${startTime}`);
    this.scheduleStopJob(job,jobName,end);
  }

  scheduleStopJob(job:CronJob,jobName:string,end:string){
    const stopJob = new CronJob(this.toCronTime(end), () => {
      job.stop();
      this.scheduleRegistry.deleteCronJob(jobName);
      console.log('job stoped !!');
    });
    stopJob.start();
  }


  toCronTime(dateTime:string){
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    return `${minute} ${hour} ${day} ${month} *`;
  }
}
