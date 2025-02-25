import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;
}

export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'roleName'] as const),
) {
  @IsOptional()
  @IsString()
  status?: string;
}

export class LoginUserPassword {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class VerifyEmailInput {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(6)
  @MinLength(6)
  token: string;
}

export class ForgotPasswordInput {
  @IsEmail()
  @IsString()
  email: string;
}

export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
