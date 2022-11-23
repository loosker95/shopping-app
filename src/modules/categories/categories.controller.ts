import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { categoriesServives } from './categories.service';
import { categoriesDto } from './dto/category.dto';
import { updateCategoryDto } from './dto/update-category.dto';


@Controller('api/v1/categories')
export class CategoriesController {
    constructor(
        private readonly categoriesServices: categoriesServives) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategory: categoriesDto) {
        try {
            const data = await this.categoriesServices.addCategory(createCategory)
            return returnResponse(HttpStatus.CREATED, "Categories created successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllCategories() {
        try {
            const data = await this.categoriesServices.getCategories()
            return returnResponse(HttpStatus.OK, "Get categories successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get(':id')
    async getOneCategory(@Param('id') id: string) {
        try {
            const data = await this.categoriesServices.getSingleCategory(id)
            return returnResponse(HttpStatus.OK, "Get Category successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateOnecategory(@Param('id') id: string, @Body() updateCategory: updateCategoryDto) {
        try {
            const data = await this.categoriesServices.updateSingleCategory(id, updateCategory)
            return returnResponse(HttpStatus.OK, "Category updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deleteOnecaterogy(@Param('id') id: string) {
        try {
            const data = await this.categoriesServices.deleSinglCategory(id)
            return returnResponse(HttpStatus.ACCEPTED, "Category deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
