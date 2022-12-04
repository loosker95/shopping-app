import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TokensModule } from "../tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";



@Module({
    imports: [
        UsersModule,
        JwtModule,
        TokensModule,
        PassportModule
    ],
    providers: [AuthServices, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthServices],
})

export class AuthModule{}