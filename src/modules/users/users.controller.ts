import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.sevice';



@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async addUser(@Body() usercreate: CreateUserDto) {
        try {
            const data = await this.usersService.createUser(usercreate)
            return returnResponse(HttpStatus.CREATED, "User created successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllUser() {
        try {
            const data = await this.usersService.getUsers()
            return returnResponse(HttpStatus.OK, "Get users successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get(':id')
    async getOneUser(@Param('id') id: string) {
        try {
            const data = await this.usersService.getSingleUser(id)
            return returnResponse(HttpStatus.OK, "Get user successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deleteuser(@Param('id') id: string) {
        try {
            const data = await this.usersService.deleteSingleUser(id)
            return returnResponse(HttpStatus.ACCEPTED, "User deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }
}
