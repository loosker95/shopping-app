import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";

@Module({
    imports: [
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthServices],
    exports: [AuthServices],
})

export class AuthModule{}