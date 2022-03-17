import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configService } from 'src/config/config.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const {
  host: rabbitMQHost,
  port: rabbitMQPort,
  user: rabbitMQUser,
  password: rabbitMQPassword,
} = configService.getRabbitMQConfig();

@Module({
  imports: [
    HttpModule,
    // ClientsModule.register([
    //   {
    //     name: 'USERS_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [
    //         `amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}/`,
    //       ],
    //       queue: 'users_service_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
