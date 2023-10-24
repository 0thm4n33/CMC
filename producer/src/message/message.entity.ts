import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AnimationType} from "./enums/animation-type.enum";
import {SchedulerEntity} from "../scheduler/scheduler.entity";

@Entity("message")
export class MessageEntity{
    constructor(hello: string, red: string, TRADITIONAL: AnimationType) {

    }

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    message: string;
    @Column()
    coleur: string;
    @Column({
        type: 'enum',
        enum: AnimationType,
        default: AnimationType.TRADITIONAL
    })
    animation: AnimationType;
    @OneToMany(() => SchedulerEntity, scheduler => scheduler.message)
    schedule:SchedulerEntity[];
}