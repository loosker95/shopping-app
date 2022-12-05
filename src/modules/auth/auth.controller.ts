import { Body, Controller, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthServices } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { LogOutDto } from './dto/logout.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';


@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthServices
    ){}

    @Post('register')
    async registerUser(@Body() registerUser: CreateUserDto) {
        try {
            const data = await this.authServices.registeruser(registerUser)
            return returnResponse(HttpStatus.ACCEPTED, "User register successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Post('login')
    async CreateLogin(@Body() loginUser: LogInDto){
        const data = await this.authServices.login(loginUser)
        return returnResponse(HttpStatus.OK, "Login successfully!", data)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async CreateLogout(
        @Body() logOutUser: LogOutDto,
        @Req() request
        ){
        const data = await this.authServices.logout(logOutUser, request.user)
        return returnResponse(HttpStatus.OK, "Logout successfully!", data)
    }
}
