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
  const host = process.env.HOST || '0.0.0.0'; // Utiliza la variable de entorno HOST o el valor '0.0.0.0' como dirección IP
  const port = process.env.PORT || 3000; // Utiliza la variable de entorno PORT o el valor 3000 como puerto
  await app.listen(port, host);

}
bootstrap();
