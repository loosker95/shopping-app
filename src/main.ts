import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from "dotenv";

config({path: './config.env'})
const PORT = process.env.PORT;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, ()=>{
    console.log(`App run successfully on http://localhost:${PORT}`)
  });
}
bootstrap();
