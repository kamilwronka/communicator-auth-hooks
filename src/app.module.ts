import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import { HealthController } from './health/health.controller';

import appConfig from './config/app.config';
import servicesConfig from './config/services.config';
import { EEnvironment } from './config/types';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, servicesConfig],
      cache: true,
      validationSchema: Joi.object({
        ENV: Joi.string()
          .valid(EEnvironment.LOCAL, EEnvironment.DEV, EEnvironment.PROD)
          .default(EEnvironment.LOCAL),
        PORT: Joi.number(),
        MOCKSERVER_URL: Joi.string().optional(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
