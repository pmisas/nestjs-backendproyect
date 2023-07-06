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
  await app.listen(8080|| 3000);

}
bootstrap();
