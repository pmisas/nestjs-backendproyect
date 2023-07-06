import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateProyectDto, CreateUserDto } from 'src/shared';
import { EditUserDto } from 'src/shared/dto/user/edit-user.dto';
import { LoginDto } from 'src/shared/dto/user/login.dto';
import { Repository } from 'typeorm';
import {compare } from 'bcrypt'
import {JwtService } from '@nestjs/jwt';
import { IPayload } from './payload.interface';
import { Response, Request} from 'express';
import { ProyectsService } from '../proyects/proyects.service';
import { Proyect } from 'src/entities/proyect.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly authRepository:Repository<User>,   
        private readonly jwtService: JwtService,
        private readonly proyectsSerive: ProyectsService,
        private readonly configService: ConfigService
    ){}

    //TRAER TODOS LOS USUARIOS
    async getall(){
        const user = await this.authRepository.find()
        if(!user) throw new NotFoundException('El usuario no existe')
        return user;
    }

    //VER UN USUARIO BUSCANDO POR ID
    async getUser(idUser: number){
        const user = await this.authRepository.findOne({
            where: {id: idUser}
        })

        if (!user) throw new NotFoundException('El usuario no existe')
        return user
    }

    async getCoworkers(idProyect: number){
        const user = await this.authRepository.find({
            where: {id_Proyect: idProyect}
        })

        if (!user) throw new NotFoundException('El usuario no existe')
        return user
    }



    //CREAR USUARIO
    //async createUser(dto:CreateUserDto){
    //    
    //const user = this.authRepository.create(dto)
    //return await this.authRepository.save(user);

    async createUser(dto:CreateUserDto){
        
        const duplicateEmail = await this.authRepository.findOne({
            where:{email: dto.email}
        })
        if(duplicateEmail) throw new UnauthorizedException('*Ya existe una cuenta con este email')

        var saltOrRounds=10
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds)
        dto.password=hashedPassword
        const user = await this.authRepository.create(dto)
        const newuser = await this.authRepository.save(user);
        
        const {password, ...result} = newuser

        console.log(dto)
        if(dto.is_Admin===true){
            const proyect = await this.proyectsSerive.createNewProyect(newuser.id)
            console.log(proyect)

            return proyect
        }else{
            return result
        }
    }

    //EDITAR USUARIO
    async editUser(idUser:number, dto:EditUserDto){
    const user = this.authRepository.findOne({
        where: {id: idUser}
    })
    if (!user) throw new NotFoundException('El usuario no existe')
    return await this.authRepository.update(idUser, dto)
    }


    //ELIMINAR USUARIO
    async deleteUser(iduser:number){
    const user = await this.authRepository.findOne({
        where: {id: iduser}
    })
    if (!user) throw new NotFoundException('El usuario no existe')
    
    return await this.authRepository.delete(iduser)
    }

    async login(
        dto: LoginDto, response
        ){
        const {email} = dto;
        const user = await this.authRepository.findOne({where: {email} });
        if(!user) return new UnauthorizedException('*No existe el usurio');
        const passwordOk = compare(dto.password, user.password) 
        if (!await bcrypt.compare(dto.password,user.password)) return new UnauthorizedException('*Contraseña incorrecta');
        const payload: IPayload = {
            id: user.id,
            email: user.email,
            is_Admin: user.is_Admin
        }
        
        const jwt = await this.jwtService.signAsync(payload)

        response.cookie('jwt', jwt, {httpOnly:true})
        
        return {message: 'succes', data: jwt};
    }

    async user(request: Request){
        console.log(request)
        try {
        const cookie = request.cookies['jwt']

        const data =  await this.jwtService.verifyAsync(cookie)
        console.log('1',cookie)
        if (!data){
            throw new UnauthorizedException();
        }

        const user = await this.getUser(data['id'])
        //quito contrase;a
        const {password, ...result} = user

        return user


        }catch (error){
            throw new UnauthorizedException();
        }
        
    }

    
    async validateToken(authorizationHeader: string) {

        const [bearer, token] = authorizationHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
          // El encabezado no tiene el formato esperado
          return false;
        }
        try {
            const tokens = token.replace(/^"(.*)"$/, '$1');
            const data = jwt.decode(tokens, { complete: true })
        if (!data){

            throw new UnauthorizedException();
        }

        const user = await this.getUser(data['id'])
        //quito contrase;a
        const {password, ...result} = user

        return authorizationHeader


        }catch (error){
            throw new UnauthorizedException();
        }
      }

    
    async logout(@Res({passthrough: true}) response: Response){
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }

    //async inProyect(idUser:number, idProyect:any){
    //    const user = await this.authRepository.findOne({where: {id: idUser} });
    //    if(user.id_Proyect!==idProyect) throw new UnauthorizedException('un usuario no pertenece al proyecto')
    //    return user
    //}
}


