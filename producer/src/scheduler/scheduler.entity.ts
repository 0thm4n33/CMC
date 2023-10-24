import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MessageEntity} from "../message/message.entity";

@Entity("Schedule")
export class SchedulerEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    start: Date;
    @Column()
    end:Date;

    @ManyToOne(() => MessageEntity, message => message.schedule)
    message: MessageEntity
}
