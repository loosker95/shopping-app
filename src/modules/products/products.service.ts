import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProducts.dto';
import products from './entity/products.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(products)
        private productsRepository: Repository<products>,
    ) { }

    async addProduct(productCreate: CreateProductDto){
        const newProducts = await this.productsRepository.create(productCreate)
        await this.productsRepository.save(newProducts)
        return newProducts;
    }

    async getProducts() {
        const products = this.productsRepository.find()
        if (!products) throw new NotFoundException("Products not found");
        return products;
    }

    async getSingleProduct(id: string){
        const product = await this.productsRepository.findOne({where: {id: id}})
        if (!product) throw new NotFoundException("Products not found");
        return product;
    }

    async deleteSingleProduct(id: string){
        const getProduct = await this.productsRepository.findOne({where: {id: id}})
        if (!getProduct) throw new NotFoundException("Products not found");
        const product = await this.productsRepository.remove(getProduct)
        return product
    }
}
