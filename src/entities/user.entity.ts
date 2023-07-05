import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Proyect } from "./proyect.entity";
import { Task } from "./task.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column({nullable: true })
    age:number

    @Column({type: 'varchar', length: 25, nullable: false, unique:true})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({nullable: false})
    is_Admin: boolean

    @Column({default: "assets/images/user/gato.jpg", nullable:false})
    avatar: string;

    @Column({default: ""})
    info: string;

    @Column({default: ""})
    gender: string;

    @Column({default: ""})
    description: string;

    @Column({default: ""})
    charge:string

    @Column({nullable:true})
    id_Proyect: number

    @ManyToMany(()=> Task, (task)=> task.users)
    tasks: Task[]


}