import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from 'src/entities/proyect.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { CreateProyectDto } from 'src/shared/dto/proyect/create-proyects.dto';
import { EditProyectDto } from 'src/shared/dto/proyect/edit-proyect.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectsService {

    constructor(
        @InjectRepository(Proyect) private proyectRepository: Repository<Proyect>
    ){}

    async getAll(){
        return await this.proyectRepository.find()
    }

    async getProyect(idProyect:number){
        const proyect =  await this.proyectRepository.findOne({
            where: {id:idProyect}
        })

        if(!proyect) throw new NotFoundException('No se encontró el proyecto')
        return proyect
    }

    //CREAR PROYECTO
    async createProyect(dto:CreateProyectDto){
        
        const proyect = this.proyectRepository.create(dto)
        return await this.proyectRepository.save(proyect);
    }

    //EDITAR PROYECTO
    async editProyect(idProyect:number,dto:EditProyectDto){
        const proyect = this.proyectRepository.findOne({
            where: {id:idProyect}
        })
        if(!proyect) throw new NotFoundException('No se encontró el proyecto')

        const edit = Object.assign(proyect, dto)
        return await this.proyectRepository.update(idProyect, dto)
    }

    //ELIMINAR PROYECTO
    async deleteProyect(id:number){
        return await this.proyectRepository.delete(id)
    }
}
