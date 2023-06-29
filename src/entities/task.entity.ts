import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proyect } from "./proyect.entity";
import { User } from "./user.entity";

@Entity({name: "tasks"})
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', length: 20})
    name:string;

    @Column()
    id_Proyect:number;

    @Column()
    description?:string;

    @CreateDateColumn({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    date:Date;

    @Column({nullable: true})
    chek:boolean;
    
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
