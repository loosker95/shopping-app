import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateProductDto } from './dto/createProducts.dto';
import { ProductsService } from './products.service';


@Controller('api/v1/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createProduct(@Body() productCreate: CreateProductDto) {
        try {
            const data = await this.productsService.addProduct(productCreate)
            return returnResponse(HttpStatus.CREATED, "Products added successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllProducts() {
        try {
            const data = await this.productsService.getProducts()
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
