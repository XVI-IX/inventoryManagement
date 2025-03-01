import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  products?: string[];
}
