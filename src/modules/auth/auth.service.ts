import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.sevice";


@Injectable()
export class AuthServices{
    constructor(
        private readonly usersService: UsersService
    )
    {}

    async login(){
        return 'ok'
    }
}