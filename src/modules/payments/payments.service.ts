import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payments.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import payments from "./entity/payments.entity";



@Injectable()
export class PaymentsServices {
    constructor(@InjectRepository(payments)
    private readonly paymentsRepository: Repository<payments>
    ) { }

    async createPayment(paymentData: CreatePaymentDto) {
        const newPayment = this.paymentsRepository.create(paymentData)
        await this.paymentsRepository.save(newPayment);
        return newPayment;
    }

    async getPayments() {
        const payments = await this.paymentsRepository.createQueryBuilder("payments")
        .leftJoinAndSelect("payments.coupon", "Coupon")
        .getMany()
        if (Object.keys(payments).length == 0) throw new NotFoundException("Payments not found");
        return payments
    }

    async getSinglePayment(id: string){
        const payment = await this.paymentsRepository.findOne({where: {id: id}})
        if (!payment) throw new NotFoundException("Payment not found");
        return payment
    }

    async updateSinglePayment(id: string, paymentUpdate: UpdatePaymentDto) {
        await this.paymentsRepository.update(id, paymentUpdate)
        const getPayment = await this.paymentsRepository.findOne({ where: { id: id } })
        if (!getPayment) throw new NotFoundException("Payment not found");
        return getPayment
    }

    async deleteSinglePayment(id: string){
        const getPayment = await this.paymentsRepository.findOne({where: {id: id}})
        if (!getPayment) throw new NotFoundException("Payment not found");
        const payment = await this.paymentsRepository.remove(getPayment)
        return payment
    }

}