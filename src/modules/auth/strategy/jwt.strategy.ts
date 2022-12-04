import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Fabien'
        })
    }

    // async validate(tokenPayload: any) { 
    //     const user = await this.usersService.getUserById(tokenPayload.payload.id);
    //     if (user) {
    //       const {password,...other} = user;
    //       return other;
    //     } else {
    //       throw new UnauthorizedException();
    //     }
    //   }
    
}