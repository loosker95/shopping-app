import { HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import { TokensServices } from "../tokens/tokens.service";
import { UsersService } from "../users/users.sevice";
import { LogInDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';;
import { LogOutDto } from "./dto/logout.dto";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { hashPassword } from "src/utils/hash/hashPassword";


@Injectable()
export class AuthServices{
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokensServices,
    )
    {}

    async registeruser(addRegisterUser: CreateUserDto) {
        const hashPass = await hashPassword(addRegisterUser.password);
        addRegisterUser.password = hashPass;
    
        const chekEmail = await this.usersService.isEmailExist(addRegisterUser.email)
        if (chekEmail) throw new NotFoundException("Email already exist...");
        const newUserRegister = await this.usersService.saveUser(addRegisterUser)

        return newUserRegister;
      }

    async login(loginUserInfo: LogInDto){
        const checkEmail = await this.usersService.isEmailExist(loginUserInfo.email)
        if(!checkEmail) throw new NotFoundException("User doesn't exist");

        const getInfoUser = await this.usersService.getUserId(loginUserInfo.email)
        const checPassword = await bcrypt.compare(loginUserInfo.password, getInfoUser.password);
        if(!checPassword)throw new NotFoundException("Email or password incorect");

        const payload = {id: getInfoUser.id, email: loginUserInfo.email}
        const tokens = this.tokensService.generateTokens(payload)

        // save token
        const data = {
            user_id: getInfoUser.id,
            token: tokens.access_token,
            refresh_token:tokens.refresh_token,
            duration: process.env.REFRESH_TOKEN_EXPIRE_TIME,
            created_at: new Date(),
            updated_at: new Date()
        }
        await this.tokensService.saveToken(data)
        return ([{user: loginUserInfo, token: tokens}])
    }

    async logout(logOutData: LogOutDto, UserData: any){
        try {
            await this.tokensService.DeleteToKenForUser(UserData['id'])
          } catch (error) {
            throw new HttpException(error.message, error.status);
          }  
    }

    async validateUser(email: string){
        const user = await this.usersService.isEmailExist(email['payload'].email);
        if (!user) {
          throw new HttpException('Invalid token...', HttpStatus.UNAUTHORIZED);
        }      
        return user;
      }

    
}