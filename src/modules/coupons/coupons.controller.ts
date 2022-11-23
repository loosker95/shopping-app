import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CouponsService } from './coupons.service';
import { CreateCouponsDto } from './dto/create-coupons.dto';


@Controller('api/v1/coupons')
export class CouponsController {
    constructor(private readonly coponsServices: CouponsService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCoupon(@Body() couponCreate: CreateCouponsDto) {
        try {
            const data = await this.coponsServices.addCoupon(couponCreate)
            return returnResponse(HttpStatus.CREATED, "Coupon added successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllCoupons() {
        try {
            const data = await this.coponsServices.getCoupons()
            return returnResponse(HttpStatus.OK, "Get coupons successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
