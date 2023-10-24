import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {Repository} from "typeorm";
import {CreateMessageDTO} from "./dto/create-message.dto";

@Injectable()
export class MessageService{
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository:Repository<MessageEntity>
    ) {}

    async create(messageDTO:CreateMessageDTO): Promise<CreateMessageDTO>{
        return await this.messageRepository.save(messageDTO);
    }

    findOne(id: number): Promise<MessageEntity | null>{
        return this.messageRepository.findOneBy({id})
    }

    findAll(): Promise<MessageEntity[]>{
        return this.messageRepository.find({
            relations:{
                schedule:true
            }
        });
    }
}