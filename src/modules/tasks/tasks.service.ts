import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EditTaskDto } from 'src/shared/dto/task/edit_task.dto';
import { CreateTaskDto } from 'src/shared/dto/task/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly authService: AuthService
    ){}

    //TRAER TODAS LAS TAREAS
    async getAll(): Promise<Task[]>{
        return await this.taskRepository.find()
    }

    //VER UNA TAREA BUSCANDO POR ID
    async getTask(idTask: number){
        const task = await this.taskRepository.find({
            where: {id_Proyect: idTask}, relations: ['users']
        })

        if (!task) throw new NotFoundException('La tarea no existe')
        return task
    }

    async get(id:number){
        const task = await this.taskRepository.findOne({
            where: {id: id}, relations: ['users']
        })
        return task
    }
    //CREAR TAREA
    //async createTask(dto:CreateTaskDto){
    //const task = this.taskRepository.create(dto);
    //return await this.taskRepository.save(task);

    async createTask(dto:CreateTaskDto){
        const newTask = new Task();
        newTask.name = dto.name;
        newTask.id_Proyect = dto.id_Proyect
        newTask.description= dto.description
        newTask.date = dto.date
        newTask.check = dto.check
        const userIds = dto.users;
        const users = await this.userRepository.findByIds(userIds);
        newTask.users = users;
        return this.taskRepository.save(newTask)   
    }

    //EDITAR TAREA

    async editTask(idTask:number, dto:EditTaskDto){
        // tarea cuando tiene check
        const task = await this.taskRepository.findOne({
            where:{id:idTask}, relations: ['users']
        })
        if(!task) throw new NotFoundException('La tarea no existe')
        //tarea cuando no tiene check
    

        //si tiene check solo se le puede quitar 
        if(task.check===true){
            if(dto.check!==false)throw new UnauthorizedException('La tarea termino')
            task.check = dto.check
            return await this.taskRepository.save(task)
        }
        if(task.check===false){ 
            //si no tiene check y lo va poner true pone al admin y le pone check
            
            if(dto.check===true){
                const admin = await this.userRepository.findOne({
                    where:{id_Proyect:task.id_Proyect}
                })
                task.users.push(admin)
                task.check=dto.check
                return await this.taskRepository.save(task)
            }
            if(dto.check===false){ //si no tiene check y lo va poner false quita check
                task.check=dto.check
                return await this.taskRepository.save(task)
            }
            if(dto.check===undefined){  //si no cambia todo
                
                const userIds = dto.users;
                const newTask= Object.assign(task, dto)
                newTask.date=dto.date
                newTask.description=dto.description
                newTask.name = dto.name
                const users = await this.userRepository.findByIds(userIds);
                newTask.users = users;
                
                return await this.taskRepository.save(newTask)
            }
        }
        

        /*
        const task = this.taskRepository.findOne({
            where: {id: idTask}
        })

        
        const encontrar = await this.taskRepository.findOne({
            where: {id: idTask}, relations: ['users']
        })

        const resultados: boolean[] = []
        if(dto.users !== undefined){
            for (const idUser of dto.users){
                const usuario = await this.userRepository.findOne({ where:{id:idUser}})
                const cumplePropiedad = usuario && (usuario.id_Proyect===encontrar.id_Proyect)
    
                resultados.push(cumplePropiedad);
            }
            
            const hasInvalidValue = resultados.some((value) => value !== true );
    
            if (hasInvalidValue) {
              throw new NotFoundException('Parece que hubo un error, intenta despues');
            }
        }

        const editTask = Object.assign(dto, task)
        if(dto.users !== undefined){
            const userIds = dto.users;
            const users = await this.userRepository.findByIds(userIds);
            (await editTask).users = users;
        }else{
           const user = (await this.get(idTask)).users
           const userIds=[]
            user.forEach(element => {
                userIds.push(element.id)
            });
            const users = await this.userRepository.findByIds(userIds);
            (await editTask).users = users;
        }
        
        (await editTask).id = idTask;
        console.log(editTask)
        return await this.taskRepository.save(editTask)
        */


    }

    //ELIMINAR TAREA
    async deleteTask(idTask:number){
    return await this.taskRepository.delete(idTask)
    }

}
