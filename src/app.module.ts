import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProyectsModule } from './modules/proyects/proyects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [__dirname + '**/entities/*.entity{.ts,.js}'],
      //entities: [],
      //autoLoadEntities:true,
      synchronize: true,
    }),
    TasksModule, ProyectsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})export class AppModule {}
