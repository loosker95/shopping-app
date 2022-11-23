import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CouponsController } from "./coupons.controller";
import { CouponsService } from "./coupons.service";
import coupons from "./entity/coupons.entity";




@Module({
    imports: [TypeOrmModule.forFeature([coupons])],
    controllers: [CouponsController],
    providers: [CouponsService],
    exports: [CouponsService],
})

export class CouponsModule{}