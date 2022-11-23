import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import orders from "./entity/orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";


@Module({
    imports: [TypeOrmModule.forFeature([orders])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})

export class OrdersModule{}