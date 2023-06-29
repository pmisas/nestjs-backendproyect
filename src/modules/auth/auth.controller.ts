import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/shared';
import { EditUserDto } from 'src/shared/dto/user/edit-user.dto';
import { LoginDto } from 'src/shared/dto/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';

@Controller('user')
export class AuthController {

  constructor(
      private readonly userService : AuthService,
  ){}

  @Get()
  async getAll(){
    const data =  await this.userService.getall()
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id:number){
    const data =  await this.userService.getUser(id)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Get()
  async actualUser(@Req() request: Request){
    const cookie = request['jwt']

    return cookie
  }

  @Post('register')
  async register(
    @Body() dto:CreateUserDto){
    return  await this.userService.createUser(dto)
  }

  
  @Post('login')
  async login(
    @Body() 
    dto:LoginDto,
    @Res({'passthrough':true}) response: Response
    ){
    return  await this.userService.login(dto, response)
  }

  @Put(':id')
  async updateUser(
    @Param('id',ParseIntPipe) id:number, 
    @Body() dto:EditUserDto){
      return await this.userService.editUser(id, dto)
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id:number){
    return await this.userService.deleteUser(id)
  }
}
