import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { Session } from "../../session/schema/session.schema";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ length: 254 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @OneToMany(() => Session, session => session.user)
    sessions: Session[];
}