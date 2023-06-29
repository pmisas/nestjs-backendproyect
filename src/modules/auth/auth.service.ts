import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/shared';
import { EditUserDto } from 'src/shared/dto/user/edit-user.dto';
import { LoginDto } from 'src/shared/dto/user/login.dto';
import { Repository } from 'typeorm';
import {compare } from 'bcrypt'
import {JwtService } from '@nestjs/jwt';
import { IPayload } from './payload.interface';
import { Response, Request} from 'express';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly authRepository:Repository<User>,   
        private readonly jwtService: JwtService 
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

        if (!user) throw new NotFoundException('La USUARIO no existe')
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
        if(duplicateEmail) throw new BadRequestException('Ya existe una cuenta con este email')
        var saltOrRounds=10
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds)
        dto.password=hashedPassword
        const user = await this.authRepository.create(dto)
        const newuser = await this.authRepository.save(user);
        
        const {password, ...result} = newuser

        return result
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
        dto: LoginDto,
        @Res({passthrough: true}) response: Response
        ){
        const {email} = dto;
        const user = await this.authRepository.findOne({where: {email} });
        if(!user) return new UnauthorizedException('no existe el usurio');
        const passwordOk = compare(dto.password, user.password) 
        if (!await bcrypt.compare(dto.password,user.password)) return new UnauthorizedException('contraseña erronea');
        const payload: IPayload = {
            id: user.id,
            email: user.email,
            is_Admin: user.is_Admin
        }
        
        const jwt = await this.jwtService.signAsync(payload)

        response.cookie('jwt', jwt, {httpOnly:true})

        return {message: 'succes'};
    }

    async user(request: Request){
        try {
        const cookie = request.cookies['jwt']

        const data =  await this.jwtService.verifyAsync(cookie)
        if (!data){
            throw new UnauthorizedException();
        }

        const user = await this.getUser(data['id'])
        //quito contrase;a
        const {password, ...result} = user

        return result


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
}


