import { Controller, HttpStatus, Post } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { AuthServices } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthServices
    ){}

    @Post('login')
    async CreateLogin(){
        const data = await this.authServices.login()
        return returnResponse(HttpStatus.OK, "Login successfully!", data)
    }
}
