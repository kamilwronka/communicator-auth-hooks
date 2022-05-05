import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.getPort();

  Logger.log(`Starting application on port: ${port}`);

  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  await app.listen(port);
}
bootstrap();
