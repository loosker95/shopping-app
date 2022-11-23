import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCouponsDto } from "./dto/create-coupons.dto";
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

}