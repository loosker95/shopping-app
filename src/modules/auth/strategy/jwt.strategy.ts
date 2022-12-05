import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthServices } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthServices
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:  process.env.TOKEN_SECRET,
        })
    }

    async validate(payload: string ) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    
        return user;
      }
    
}