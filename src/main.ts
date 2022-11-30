import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './core/swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AllExceptionFilter } from './core/filters/exception.filter';
import { TransformInterceptor } from './core/interceptors/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json, urlencoded } from 'express';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(new AllExceptionFilter(new HttpAdapterHost()));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  SwaggerModule.setup('api/v1', app, createDocument(app));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            property: error.property,
            validators: error.constraints,
          })),
        );
      },
    }),
  );

  await app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`App started on port ${process.env.APP_PORT || 3000}`);
  });
})();
