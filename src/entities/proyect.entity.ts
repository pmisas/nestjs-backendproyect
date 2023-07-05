import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('proyects')
export class Proyect {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    id_Admin: number

    @Column()
    description?:string;
}

