import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import CreateOrderDto from './dto/create-order.dto';
import UpdateOrderDto from './dto/update-order.dto';
import { OrdersService } from './orders.service';



@Controller('api/v1/orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllOrders(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Req() request
    ) {
        try {
            const data = await this.orderService.getOrders(page, limit, request.user)
            return returnResponse(HttpStatus.CREATED, "Get orders successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOneOrder(@Param('id') id: string) {
        try {
            const data = await this.orderService.getSingleOrder(id)
            return returnResponse(HttpStatus.OK, "Get order successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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
