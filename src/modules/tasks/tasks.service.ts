import { Injectable, NotFoundException } from '@nestjs/common';
import { EditTaskDto } from 'src/shared/dto/task/edit_task.dto';
import { CreateTaskDto } from 'src/shared/dto/task/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    //TRAER TODAS LAS TAREAS
    async getAll(): Promise<Task[]>{
        return await this.taskRepository.find()
    }

    //VER UNA TAREA BUSCANDO POR ID
    async getTask(idTask: number){
        const task = await this.taskRepository.findOne({
            where: {id: idTask}
        })

        if (!task) throw new NotFoundException('La tarea no existe')
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
        newTask.chek = dto.chek
        const userIds = dto.users;
        const users = await this.userRepository.findByIds(userIds);
        newTask.users = users;
        return this.taskRepository.save(newTask)

        
    }


    //EDITAR TAREA

    async editTask(idTask:number, dto:EditTaskDto){
        const task = this.taskRepository.findOne({
            where: {id: idTask}
        })

        const editTask = Object.assign(dto, task)
        const userIds = dto.users;
        const users = await this.userRepository.findByIds(userIds);
        (await editTask).id = idTask;
        (await editTask).users = users;
        return await this.taskRepository.save(editTask)
        

    }

    //ELIMINAR TAREA
    async deleteTask(idTask:number){
    return await this.taskRepository.delete(idTask)
    }

}
