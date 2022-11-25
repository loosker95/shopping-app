import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import tokens from "./entity/tokens.entity";
import { TokensController } from "./tokens.controller";
import { TokensServices } from "./tokens.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([tokens]),
        UsersModule,
        JwtModule
    ],
    controllers: [TokensController],
    providers: [TokensServices],
    exports: [TokensServices],
})

export class TokensModule { }