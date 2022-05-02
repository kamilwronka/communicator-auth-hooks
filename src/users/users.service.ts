import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  create(createUserData: CreateUserDto): any {
    const response = this.httpService.post(
      'http://users:4000/account',
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
