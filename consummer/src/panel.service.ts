import {IMessage} from "./message.interface";

export class PanelService {
    send(message: IMessage): void{
        console.log(`message: ${message.message} ${message.coleur} ${message.animation}`)
    }
}