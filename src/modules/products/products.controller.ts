import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateProductDto } from './dto/createProducts.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ProductsService } from './products.service';



@Controller('api/v1/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() productCreate: CreateProductDto) {
        try {
            const data = await this.productsService.addProduct(productCreate)
            return returnResponse(HttpStatus.CREATED, "Products added successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllProducts(
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        try {
            const data = await this.productsService.getProducts(page, limit)
            return returnResponse(HttpStatus.OK, "Get products successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get(':id')
    async getOneProduct(@Param('id') id: string) {
        try {
            const data = await this.productsService.getSingleProduct(id)
            return returnResponse(HttpStatus.OK, "Get product successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateOneproduct(@Param('id') id: string, @Body() updateProduct: UpdateProductsDto){
        try{
            const data = await this.productsService.updateSingleProducts(id, updateProduct)
            return returnResponse(HttpStatus.OK, "Product updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOneProducts(@Param('id') id: string) {
        try {
            const data = await this.productsService.deleteSingleProduct(id)
            return returnResponse(HttpStatus.ACCEPTED, "Product deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }
}
