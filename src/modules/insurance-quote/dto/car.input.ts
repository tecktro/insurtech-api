import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CarInput {

  @IsNotEmpty()
	@IsString()
  brand: string;

  @IsNotEmpty()
	@IsInt()
  year: number;

	@IsNotEmpty()
	@IsBoolean()
  hasAC: boolean;
}
