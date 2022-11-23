import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import payments from "./entity/payments.entity";
import { PaymentsController } from "./payments.controller";
import { PaymentsServices } from "./payments.service";



@Module({
    imports: [TypeOrmModule.forFeature([payments])],
    controllers: [PaymentsController],
    providers: [PaymentsServices],
    exports: [PaymentsServices],
})

export class PaymentsModule { }