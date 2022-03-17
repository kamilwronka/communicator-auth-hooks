import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
