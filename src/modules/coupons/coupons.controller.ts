import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CouponsService } from './coupons.service';
import { CreateCouponsDto } from './dto/create-coupons.dto';
import { UpdateCouponsDto } from './dto/update-coupon.dto';


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

    @Get(':id')
    async getOneCoupon(@Param('id') id: string) {
        try {
            const data = await this.coponsServices.getSingleCoupon(id)
            return returnResponse(HttpStatus.OK, "Get coupon successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateOneCoupon(@Param('id') id: string, @Body() updateCoupon: UpdateCouponsDto){
        try{
            const data = await this.coponsServices.updateSingleCoupon(id, updateCoupon)
            return returnResponse(HttpStatus.OK, "Coupon updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deleteOneCoupon(@Param('id') id: string) {
        try {
            const data = await this.coponsServices.deleteSingleCoupon(id)
            return returnResponse(HttpStatus.ACCEPTED, "Coupon deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
