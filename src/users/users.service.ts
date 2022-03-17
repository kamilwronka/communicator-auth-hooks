import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';
import { AxiosError, AxiosResponse } from 'axios';
@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  create(createUserData: CreateUserDto): any {
    console.log('request sent');

    const response = this.httpService.post(
      'http://communicator-users-service:4000/users/create/account',
      createUserData,
    );

    return response.pipe(
      catchError((e) => {
        throw new BadRequestException(e.response.data);
      }),
      map((res) => res.data),
    );
  }
}
