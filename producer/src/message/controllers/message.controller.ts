import {Body, Controller, Get, Post, Render, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateMessageDTO} from "../dto/create-message.dto";
import {MessageService} from "../message.service";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService:MessageService) {
    }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() messageDTO:CreateMessageDTO){
        return this.messageService.create(messageDTO);
    }

    @Get()
    async findAll(){
        return this.messageService.findAll();
    }
}
