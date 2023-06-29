import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProyectDto } from 'src/shared';
import { ProyectsService } from './proyects.service';
import { EditProyectDto } from 'src/shared/dto/proyect/edit-proyect.dto';

@Controller('proyects')
export class ProyectsController {

    constructor(
        private readonly proyectsService:ProyectsService
    ){}


    @Get()
    async getAll(){
        const data =  await this.proyectsService.getAll()
        return {
          error: false,
          message: 'Peticion correcta',
          data: data
        }
    }

    @Get(':id')
    async getProyect(
        @Param('id', ParseIntPipe) id:number){
            const data =  await this.proyectsService.getProyect(id)
            return {
              error: false,
              message: 'Peticion correcta',
              data: data
            }
    }

    @Post()
    async createProyect(
        @Body() dto: CreateProyectDto){
            const data =  await this.proyectsService.createProyect(dto)
            return {
              error: false,
              message: 'Peticion correcta',
              data: data
            }
    }

    @Put(':id')
    async updateProyect(
        @Param('id', ParseIntPipe)id:number,
        @Body() dto:EditProyectDto ){
            const data =  await this.proyectsService.editProyect(id,dto)
            return {
              error: false,
              message: 'Peticion correcta',
              data: data
            }
    }

    @Delete(':id')
    async deleteProyect(
        @Param('id', ParseIntPipe)id:number){
            const data =  await this.proyectsService.deleteProyect(id)
            return {
              error: false,
              message: 'Peticion correcta',
              data: data
            }
    }

}

