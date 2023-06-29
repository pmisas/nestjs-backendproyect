import { Module } from '@nestjs/common';
import { ProyectsController } from './proyects.controller';
import { ProyectsService } from './proyects.service';
import { Proyect } from 'src/entities/proyect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Proyect])
  ],
  controllers: [ProyectsController],
  providers: [ProyectsService]
})
export class ProyectsModule {}
