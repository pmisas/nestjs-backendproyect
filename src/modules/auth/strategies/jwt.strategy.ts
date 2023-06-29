import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import {JwtService } from '@nestjs/jwt';
import {IPayload } from '../payload.interface'
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly JwtService: JwtService
    ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('JWT_SECRET')
    });
  }


  async validate(payload: IPayload){
    const email = payload;
    const username = await this.authRepository.findOne({where: {email: payload.email}});
    if(!username) return new UnauthorizedException('Necesita nombre y email');
    return payload
  }
}
