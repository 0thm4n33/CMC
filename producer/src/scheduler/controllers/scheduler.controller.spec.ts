import {Test, TestingModule} from '@nestjs/testing';
import {SchedulerController} from './scheduler.controller';
import {SchedulerService} from "../scheduler.service";
import {SchedulerEntity} from "../scheduler.entity";
import {MessageEntity} from "../../message/message.entity";
import {AnimationType} from "../../message/enums/animation-type.enum";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('SchedulerController', () => {
  let controller: SchedulerController;
  let service: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulerController],
    }).compile();

    controller = module.get<SchedulerController>(SchedulerController);
    service = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create',()=>{
    it('should create a valid schedule',async () =>{
      const scheduleExcpeted = new SchedulerEntity();
      scheduleExcpeted.message = new MessageEntity('test','black',AnimationType.TRADITIONAL);
      scheduleExcpeted.start = new Date('2023-10-23T16:25:00');
      scheduleExcpeted.end = new Date('2023-10-23T16:35:00');

      jest.spyOn(service,'create').mockImplementation(async () => scheduleExcpeted);


    })
  })
});


