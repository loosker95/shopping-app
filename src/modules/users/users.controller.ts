import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-users.dto';
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

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async udateOneUser(@Param('id') id: string, @Body() updadeUser: UpdateUserDto) {
        try {
            const data = await this.usersService.updateSingleuser(id, updadeUser)
            return returnResponse(HttpStatus.OK, "Users updated successfully!", data)
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

    @Post('register')
    @UsePipes(ValidationPipe)
    async registerUser(@Body() registerUser: CreateUserDto) {
        try {
            const data = await this.usersService.registeruser(registerUser)
            return returnResponse(HttpStatus.ACCEPTED, "User register successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }
}
