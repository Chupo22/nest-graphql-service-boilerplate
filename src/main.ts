import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { appConfig } from '@config';
import { AppModule } from './app.module';
import { LoggingInterceptor } from '@interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());

  const { host, port } = appConfig;

  await app.listen(port, host);

  Logger.log(`Listening on ${host}:${port}`, 'NestApplication');
}

bootstrap();
