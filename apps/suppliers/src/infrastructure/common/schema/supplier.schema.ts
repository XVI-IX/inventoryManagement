import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SupplierInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString({ each: true })
  products: string[];
}
