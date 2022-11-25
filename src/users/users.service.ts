import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async create(createUserData: CreateUserDto): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post('/account', createUserData).pipe(
        catchError((error: AxiosError) => {
          if (error.status === 400) {
            throw new BadRequestException(error.response.data);
          }

          throw new BadGatewayException();
        }),
      ),
    );

    return data;
  }
}
