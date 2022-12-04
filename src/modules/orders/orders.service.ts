import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import payments from "../payments/entity/payments.entity";
import CreateOrderDto from "./dto/create-order.dto";
import UpdateOrderDto from "./dto/update-order.dto";
import orders from "./entity/orders.entity";


@Injectable()
export class OrdersService{
    constructor(@InjectRepository(orders)
    private readonly ordersRepository: Repository<orders>
    ){}

    async addOrder(orderCreate: CreateOrderDto){
        const newOrders = this.ordersRepository.create(orderCreate)
        await this.ordersRepository.save(newOrders)
        return newOrders;
    }

    async getOrders(
        page?: number,
        limit?: number
    ) {
        const pages = page
        const limits = limit
        const startIndex = (pages - 1) * limits
        const endIndex = pages * limits

        const orders = await this.ordersRepository.createQueryBuilder("orders")
        .take(endIndex || 0)
        .skip(startIndex || 0)
        .leftJoinAndSelect("orders.products", "Product")
        .leftJoinAndSelect("orders.payments", "Payments")
        .getMany()
        if (Object.keys(orders).length == 0) throw new NotFoundException("Orders not found");
        
        return {orders, page, limit};
    }

    async getSingleOrder(id: string){
        const order = await this.ordersRepository.findOne({where: {id: id}})
        if (!order) throw new NotFoundException("Order not found");
        return order;
    }

    async updateSingleOrder(id: string, productUpdate: UpdateOrderDto){ 
        await this.ordersRepository.update(id, productUpdate)
        const getOrder = await this.ordersRepository.findOne({where: {id: id}})
        if (!getOrder) throw new NotFoundException("Products not found");
        return getOrder
    }

    async deleteSingleOrder(id: string){
        const getOrder = await this.ordersRepository.findOne({where: {id: id}})
        if (!getOrder) throw new NotFoundException("Order not found");
        const order = await this.ordersRepository.remove(getOrder)
        return order
    }

}