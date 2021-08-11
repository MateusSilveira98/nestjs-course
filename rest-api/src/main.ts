import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';

mongoose.set('useFindAndModify', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new ValidationFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(`, `)}`);
      return new ValidationException(messages);
    }
  }));
  app.setGlobalPrefix(`api`);
  await app.listen(9000);
}

bootstrap();
