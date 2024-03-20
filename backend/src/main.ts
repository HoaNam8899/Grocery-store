import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();
// import cors from 'cors';

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  // cors
  // const allowedOrigins = ['http://localhost:3000'];
  // const options: cors.CorsOptions = {
  //   origin: allowedOrigins
  // };
  // app.use(cors(options)); /* NEW */
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(PORT, () => console.log('server running at ' + PORT));
}
bootstrap();
