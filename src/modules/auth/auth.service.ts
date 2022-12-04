import { Injectable, NotFoundException} from "@nestjs/common";
import { TokensServices } from "../tokens/tokens.service";
import { UsersService } from "../users/users.sevice";
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthServices{
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokensServices
    )
    {}


    async login(loginUserInfo: LogInDto){

        const checkEmail = await this.usersService.isEmailExist(loginUserInfo.email)
        if(!checkEmail) throw new NotFoundException("User doesn't exist");

        const getInfoUser = await this.usersService.getUserId(loginUserInfo.email)
        const checPassword = await bcrypt.compare(loginUserInfo.password, getInfoUser.password);
        if(!checPassword)throw new NotFoundException("Email or password incorect");

        const payload = {id: getInfoUser.id, email: loginUserInfo.email}
        const tokens = this.tokensService.generateTokens(payload)

        return ([
            {
                user: loginUserInfo, 
                token: tokens
            }
            ])
    }

    // async login(email: string, password: string){
    //     const checkEmail = await this.usersService.isEmailExist(email)

    //     if(!checkEmail) throw new NotFoundException("User doesn't exist");
    //     const getInfoUser = await this.usersService.getUserId(email)

    //     const checPassword = await bcrypt.compare(password, getInfoUser.password);
    //     if(!checPassword)throw new NotFoundException("Email or password incorect");
        
    //     return null;
    // }


    // async validateUserCredentials(email: string, password: string) {
    //     const checkUser = await this.usersService.isEmailExist(email)
    //     if (checkUser && checkUser.password === password) {
    //         const {password, ...result} = checkUser;
    //         return result;
    //     }
    //     return null;
    // }

    async loginWithCredentials(user: LogInDto) {
    const getInfoUser = await this.usersService.getUserId(user.email)
    const payload = { id: getInfoUser.id, email: user.email }
    const tokens = this.tokensService.generateTokens(payload)

        return {
            access_token: tokens,
        };
    }

    
}