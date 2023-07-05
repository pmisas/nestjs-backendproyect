import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proyect } from "./proyect.entity";
import { User } from "./user.entity";
import { Transform, TransformFnParams } from 'class-transformer';
import * as moment from 'moment-timezone';

@Entity({name: "tasks"})
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', length: 49})
    name:string;

    @Column()
    id_Proyect:number;

    @Column({ type: 'varchar', length: 70})
    description?:string;

    @Column()
    //@CreateDateColumn({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    date:string;

    @Column({nullable: true, default: false})
    check:boolean;
    
    @ManyToMany((user)=> User, (user)=> user.tasks, {cascade: true}  )
    @JoinTable({
        name: 'tasks_users',
        joinColumn: {
            name: 'task_id'
        },
        inverseJoinColumn: {
            name: 'user_id'
        },
    })
    users: User[]
    
}

