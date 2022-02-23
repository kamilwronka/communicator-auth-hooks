import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { MessageResponseStatus } from 'src/enum/messageResponseStatus.enum';

type UserServiceResponse = {
  data: any;
  status: MessageResponseStatus;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @Inject('USERS_SERVICE') private client: ClientProxy,
  ) {}

  create(createUserData: CreateUserDto): Observable<UserServiceResponse> {
    const message = createUserData;
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 1,
        contentType: 'application/json',
      })
      .build();

    return this.client.send({ cmd: 'user_create' }, record).pipe(
      map<UserServiceResponse, UserServiceResponse>((response) => {
        if (response.status !== MessageResponseStatus.SUCCESS) {
          throw new UnprocessableEntityException();
        }

        return response;
      }),
    );
  }
}
