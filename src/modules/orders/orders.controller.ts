import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import CreateOrderDto from './dto/create-order.dto';
import UpdateOrderDto from './dto/update-order.dto';
import { OrdersService } from './orders.service';



@Controller('api/v1/orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(@Body() productOrder: CreateOrderDto) {
        try {
            const data = await this.orderService.addOrder(productOrder)
            return returnResponse(HttpStatus.CREATED, "Orders created successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllOrders() {
        try {
            const data = await this.orderService.getOrders()
            return returnResponse(HttpStatus.CREATED, "Get orders successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get(':id')
    async getOneOrder(@Param('id') id: string) {
        try {
            const data = await this.orderService.getSingleOrder(id)
            return returnResponse(HttpStatus.OK, "Get order successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateOneOrder(@Param('id') id: string, @Body() orderProduct: UpdateOrderDto){
        try{
            const data = await this.orderService.updateSingleOrder(id, orderProduct)
            return returnResponse(HttpStatus.OK, "Order updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deleteOneOrder(@Param('id') id: string) {
        try {
            const data = await this.orderService.deleteSingleOrder(id)
            return returnResponse(HttpStatus.ACCEPTED, "Order deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
