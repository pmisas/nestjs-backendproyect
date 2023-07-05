import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/shared';
import { EditUserDto } from 'src/shared/dto/user/edit-user.dto';
import { LoginDto } from 'src/shared/dto/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  [x: string]: any;

  constructor(
      private readonly userService : AuthService,
      private readonly jwtService: JwtService 
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

  @Get('user')
  async user(@Req()request: Request) {
    const cookie = request.cookies['jwt']

    const data =  await this.jwtService.verifyAsync(cookie)

    return this.userService.user(request)
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

  @Get(':id/coworkers')
  async getCoworokers(@Param('id', ParseIntPipe) id:number){
    const data =  await this.userService.getCoworkers(id)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
  }

  @Post('register')
  async register(
    @Body() dto:CreateUserDto){
    const data =  await this.userService.createUser(dto)
    return {
      error: false,
      message: 'Peticion correcta',
      data: data
    }
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

  @Post('logout')
  async logout(@Res({'passthrough':true}) response: Response){
    return await this.userService.logout(response)
  }

}
