import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(process.env.PORT || 3001);
  mongoose.set('debug', true);
}

bootstrap();
