import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProducts.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import products from './entity/products.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(products)
        private productsRepository: Repository<products>,
    ) { }

    async addProduct(productCreate: CreateProductDto){
        const newProducts = this.productsRepository.create(productCreate)
        await this.productsRepository.save(newProducts)
        return newProducts;
    }

    async getProducts(
        page?: number,
        limit?: number
    ) {
        const pages = page
        const limits = limit
        const startIndex = (pages - 1) * limits
        const endIndex = pages * limits

        const products = this.productsRepository.createQueryBuilder("products")
        .take(endIndex || 0)
        .skip(startIndex || 0)
        .leftJoinAndSelect("products.reviews", "Review")
        .getMany()

        if (!products) throw new NotFoundException("Products not found");
        return products;
    }

    async getSingleProduct(id: string){
        const product = await this.productsRepository.findOne({where: {id: id}})
        if (!product) throw new NotFoundException("Products not found");
        return product;
    }

    async updateSingleProducts(id: string, productUpdate: UpdateProductsDto){ 
        await this.productsRepository.update(id, productUpdate)
        const getProduct = await this.productsRepository.findOne({where: {id: id}})
        if (!getProduct) throw new NotFoundException("Products not found");
        return getProduct
    }

    async deleteSingleProduct(id: string){
        const getProduct = await this.productsRepository.findOne({where: {id: id}})
        if (!getProduct) throw new NotFoundException("Products not found");
        const product = await this.productsRepository.remove(getProduct)
        return product
    }
}
