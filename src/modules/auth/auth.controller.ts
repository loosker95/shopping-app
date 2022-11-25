import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { AuthServices } from './auth.service';
import { LogInDto } from './dto/login.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthServices
    ){}

    @Post('login')
    @UsePipes(ValidationPipe)
    async CreateLogin(@Body() loginUser: LogInDto){
        const data = await this.authServices.login(loginUser)
        return returnResponse(HttpStatus.OK, "Login successfully!", data)
    }
}
