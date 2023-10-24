import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MessageModule} from "./message/message.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchedulerModule} from "./scheduler/scheduler.module";
import {DataSource} from "typeorm";
import {MessageEntity} from "./message/message.entity";
import {SchedulerEntity} from "./scheduler/scheduler.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
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
      ConfigModule.forRoot({
          envFilePath:'.env'
      }),
      TypeOrmModule.forRootAsync({
          imports:[ConfigModule],
          inject:[ConfigService],
          useFactory:(configService:ConfigService) => ({
              type:'mysql',
              host:configService.get('DATABASE_HOST'),
              port:configService.get('DATABASE_PORT'),
              username: configService.get('DATABASE_USERNAME'),
              password:configService.get('DATABASE_PASSWORD'),
              database:configService.get('DATABASE_NAME'),
              entities:[MessageEntity,SchedulerEntity],
              autoLoadEntities: true,
          })
      }),
      MessageModule,
      SchedulerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
