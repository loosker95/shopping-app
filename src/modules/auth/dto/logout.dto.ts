import { IsString, IsNotEmpty} from 'class-validator';

export class LogOutDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
