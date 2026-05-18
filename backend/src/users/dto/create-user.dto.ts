import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username!: string;

  @IsString()
  @IsOptional()
  display_name?: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password_hash!: string;

  @IsString()
  @IsOptional()
  birthday?: string;
}