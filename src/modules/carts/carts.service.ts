import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cartsdto } from "./dto/carts.dto";
import { UpdateCartsdto } from "./dto/update-cart.dto";
import Carts from "./entity/carts.entity";


export class CartsServices{
    constructor(@InjectRepository(Carts)
       private readonly cartsRepository: Repository<Carts> 
    )
    {}

    async addCarts(createCarts: Cartsdto){
        const cart = this.cartsRepository.create(createCarts)
        await this.cartsRepository.save(cart)
        return cart
    }

    async getCarts(request: string){
        console.log(request['id'])
        const cart = await this.cartsRepository.createQueryBuilder("Carts")
        .leftJoinAndSelect("Carts.users", "Users")
        .leftJoinAndSelect("Carts.products", "Products")
        .where({user_id: request['id']})
        .getMany()
        if (Object.keys(cart).length == 0) throw new NotFoundException("Carts not found");
        return cart
    }

    async getSingleCart(id: string){
        const cart = await this.cartsRepository.findOne({where: {id: id}})
        if (!cart) throw new NotFoundException("Cart not found");
        return cart
    }

    async updateSingleCart(id: string, cartUpdate: UpdateCartsdto) {
        await this.cartsRepository.update(id, cartUpdate)
        const getCart = await this.cartsRepository.findOne({ where: { id: id } })
        if (!getCart) throw new NotFoundException("Cart not found");
        return getCart
    }

    async deleteSingleCarte(id: string){
        const getCart = await this.cartsRepository.findOne({where: {id: id}})
        if (!getCart) throw new NotFoundException("Cart not found");
        const cart = await this.cartsRepository.remove(getCart)
        return cart
    }

}