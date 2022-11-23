import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreatePaymentDto } from './dto/create-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsServices } from './payments.service';
returnResponse


@Controller('api/v1/payments')
export class PaymentsController {
    constructor(private readonly paymentsServices: PaymentsServices) { }

    @Post()
    @UsePipes(ValidationPipe)
    async addPayment(@Body() paymentCreate: CreatePaymentDto) {
        try {
            const data = await this.paymentsServices.createPayment(paymentCreate)
            return returnResponse(HttpStatus.CREATED, "Payment added successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllPayments() {
        try {
            const data = await this.paymentsServices.getPayments()
            return returnResponse(HttpStatus.OK, "Get paymenys successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get(':id')
    async getOnePayment(@Param('id') id: string) {
        try {
            const data = await this.paymentsServices.getSinglePayment(id)
            return returnResponse(HttpStatus.OK, "Get payment successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async udateOnePayment(@Param('id') id: string, @Body() updadePayment: UpdatePaymentDto) {
        try {
            const data = await this.paymentsServices.updateSinglePayment(id, updadePayment)
            return returnResponse(HttpStatus.OK, "Users updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deletePayment(@Param('id') id: string) {
        try {
            const data = await this.paymentsServices.deleteSinglePayment(id)
            return returnResponse(HttpStatus.ACCEPTED, "Payment deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
