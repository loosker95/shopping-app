import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from "dotenv";
import { ValidationPipe } from '@nestjs/common';

config({path: './config.env'})
const PORT = process.env.PORT;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  +  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT, ()=>{
    console.log(`App run successfully on http://localhost:${PORT}`)
  });
}
bootstrap();
