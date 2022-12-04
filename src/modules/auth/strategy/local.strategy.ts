import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthServices } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServices) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

//   async validate(email: string, password: string){
//     const user = await this.authService.login(email, password);
//     if (this.user == null ) throw new UnauthorizedException('ok');
//     return user;
//   }
}
