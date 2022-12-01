import { Injectable, NotFoundException } from "@nestjs/common";
import { TokensServices } from "../tokens/tokens.service";
import { UsersService } from "../users/users.sevice";
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
    
}