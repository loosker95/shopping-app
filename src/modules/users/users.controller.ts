import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.sevice';



@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(@Body() usercreate: CreateUserDto){
        const data = await this.usersService.createUser(usercreate)
        return returnResponse(HttpStatus.CREATED, "User created successfully!", data)
    }

    @Get()
    async getAllUser() {
        const data = await this.usersService.getUsers()
        return returnResponse(HttpStatus.OK, "Get users successfully!", data)
    }

    @Get(':id')
    async getOneUser(@Param('id') id: string){
        const data = await this.usersService.getSingleUser(id)
        return returnResponse(HttpStatus.OK, "Get user successfully!", data)
    }

    @Delete(':id')
    async deleteuser(@Param('id') id: string){
        const data = await this.usersService.deleteSingleUser(id)
        return returnResponse(HttpStatus.ACCEPTED, "User deleted successfully!", data)
    }
}
