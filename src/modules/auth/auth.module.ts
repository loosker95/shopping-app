import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokensModule } from "../tokens/tokens.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";


@Module({
    imports: [
        UsersModule,
        JwtModule,
        TokensModule
    ],
    controllers: [AuthController],
    providers: [AuthServices],
    exports: [AuthServices],
})

export class AuthModule{}