import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CartsServices } from './carts.service';
import { Cartsdto } from './dto/carts.dto';
import { UpdateCartsdto } from './dto/update-cart.dto';


@Controller('api/v1/carts')
export class CartsController {
    constructor(
        private readonly cartsService: CartsServices
    ) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async createCarts(@Body() createCarts: Cartsdto) {
        try {
            const data = await this.cartsService.addCarts(createCarts)
            return returnResponse(HttpStatus.CREATED, "Added to cart successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllCarts() {
        try {
            const data = await this.cartsService.getCarts()
            return returnResponse(HttpStatus.OK, "Get carts successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOnecart(@Param('id') id: string){
        try{
            const data = await this.cartsService.getSingleCart(id)
            return returnResponse(HttpStatus.OK, "Get cart successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateOneCart(@Param('id') id: string, @Body() updateCart: UpdateCartsdto) {
        try {
            const data = await this.cartsService.updateSingleCart(id, updateCart)
            return returnResponse(HttpStatus.OK, "Cart updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOneCart(@Param('id') id: string){
        try{
            const data = await this.cartsService.deleteSingleCarte(id)
            return returnResponse(HttpStatus.OK, "Cart deleted successfully!", data)
           } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
