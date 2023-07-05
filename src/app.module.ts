import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProyectsModule } from './modules/proyects/proyects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
/*
const bd_options = {
  "host": process.env.DB_HOST,
  "port": parseInt(process.env.DB_PORT || '5432'),
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database":  process.env.DB_NAME,
}
*/
@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": 'mysql',
      "host": 'b7b5ypanwlmolmkztjsm-mysql.services.clever-cloud.com',
      "port": 3306,
      "username": 'ue00drfpqhozx7go',
      "password": 'FwZ4ADfiXnc5vsJJlpPq',
      "database": 'b7b5ypanwlmolmkztjsm',
      //...bd_options,
      "entities": [__dirname + '**/entities/*.entity{.ts,.js}'],
      "synchronize": true,
    }),
    TasksModule, ProyectsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})export class AppModule {}


//TypeOrmModule.forRoot({
//  type: 'mysql',
//  host: 'localhost',
//  port: 3306,
//  username: 'root',
//  password: '',
//  database: 'test',
//  entities: [__dirname + '**/entities/*.entity{.ts,.js}'],
//  //entities: [],
//  //autoLoadEntities:true,
//  synchronize: true,
//}),
//