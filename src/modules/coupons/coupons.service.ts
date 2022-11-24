import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCouponsDto } from "./dto/create-coupons.dto";
import { UpdateCouponsDto } from "./dto/update-coupon.dto";
import coupons from "./entity/coupons.entity";



@Injectable()
export class CouponsService {
    constructor(@InjectRepository(coupons)
    private readonly couponsRepository: Repository<coupons>
    ) { }

    async addCoupon(couponCreate: CreateCouponsDto){
        const newCoupons = this.couponsRepository.create(couponCreate)
        await this.couponsRepository.save(newCoupons)
        return newCoupons;
    }
    
    async getCoupons() {
        const coupons = await this.couponsRepository.find()
        if (Object.keys(coupons).length == 0) throw new NotFoundException("Coupons not found");
        return coupons;
    }

    async getSingleCoupon(id: string){
        const coupon = await this.couponsRepository.findOne({where: {id: id}})
        if (!coupon) throw new NotFoundException("Coupon not found");
        return coupon;
    }

    async updateSingleCoupon(id: string, couponUpdate: UpdateCouponsDto){ 
        await this.couponsRepository.update(id, couponUpdate)
        const getProduct = await this.couponsRepository.findOne({where: {id: id}})
        if (!getProduct) throw new NotFoundException("Coupon not found");
        return getProduct
    }

    async deleteSingleCoupon(id: string){
        const getCoupon = await this.couponsRepository.findOne({where: {id: id}})
        if (!getCoupon) throw new NotFoundException("Coupon not found");
        const coupon = await this.couponsRepository.remove(getCoupon)
        return coupon
    }

}