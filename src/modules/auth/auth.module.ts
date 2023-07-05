import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProyectsService } from '../proyects/proyects.service';
import { ProyectsModule } from '../proyects/proyects.module';
import { ProyectsController } from '../proyects/proyects.controller';
import { Proyect } from 'src/entities/proyect.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Proyect]),
    AuthModule,
    ProyectsModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ProyectsService],
  exports: [AuthService]
})
export class AuthModule {}
