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
  //const host = process.env.HOST || '0.0.0.0';
  //const port = process.env.PORT || 3000;

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
