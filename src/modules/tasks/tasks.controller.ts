import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/shared/dto/task/create-task.dto';
import { EditTaskDto } from 'src/shared/dto/task/edit_task.dto';

@Controller('tasks')
export class TasksController {
    
  constructor(
      private readonly taskService: TasksService 
  ){}

  @Get()
  async getAll(){
    const data =  await this.taskService.getAll()
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) id:number){
    const data =  await this.taskService.getTask(id)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Get(':id/byId')
  async get(@Param('id', ParseIntPipe) id:number){
    const data =  await this.taskService.get(id)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id',ParseIntPipe) id:number, 
    @Body() dto:EditTaskDto){
      const data =  await this.taskService.editTask(id, dto)
      return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }


  @Post()
  async createTask(
    @Body() dto:CreateTaskDto){
    const data =  await this.taskService.createTask(dto)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }


  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id:number){
    const data =  await this.taskService.deleteTask(id)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

}

