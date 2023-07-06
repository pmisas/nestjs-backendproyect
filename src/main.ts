import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.enableCors({
    origin: 'https://angularcatask.web.app',
    credentials: true
  })
  await app.listen('https://console.clever-cloud.com/users/me/applications/app_45fd2a13-64eb-4ce3-803f-9ea4e101e0ef/logs');

}
bootstrap();
