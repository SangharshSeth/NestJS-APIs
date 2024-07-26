import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn } from "typeorm";
import { LogTypeEnum } from "src/metrics/dto/metric.dto";


@Entity('metrics')
export class Metric {
    @PrimaryGeneratedColumn()
    log_id: number;

    @Column()
    log: string;

    @Column({
        type: "enum",
        enum: LogTypeEnum
    })
    type: LogTypeEnum;

    @CreateDateColumn()
    created_at: Date;
}