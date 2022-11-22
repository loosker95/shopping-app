import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartsController } from "./carts.controller";
import { CartsServices } from "./carts.service";
import Carts from "./entity/carts.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Carts])],
    controllers: [CartsController],
    providers: [CartsServices],
    exports: [CartsServices],
})

export class CartsModule{ }