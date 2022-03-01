import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class Auth0UserData {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsISO8601()
  @IsNotEmpty()
  @IsString()
  created_at: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Auth0UserData)
  user: Auth0UserData;
}
