import { IsDate, IsNotEmpty, IsString } from "class-validator";
import payments from "src/modules/payments/entity/payments.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('coupons')
export default class coupons {

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({ nullable: false })
    @IsNotEmpty()
    public payment_id: string

    @Column({ nullable: false })
    @IsNotEmpty()
    public coupon_code: string

    @Column({ nullable: true, type: 'timestamptz' })
    @IsNotEmpty()
    public validity: Date

    @Column({nullable: false, type: "float", default: 0.0})
    public discount_rate: number

    @Column({ nullable: false })
    public active: boolean

    @Column({ nullable: true, type: 'timestamptz' })
    @IsDate()
    public created_at: Date

    @UpdateDateColumn({
        nullable: true,
        type: 'timestamptz'
    })
    @IsDate()
    public updated_at: Date

    @BeforeInsert()
    async beforeInsertCoupons(){
        this.created_at = new Date()
        this.updated_at = new Date();
    }

    @OneToOne(type => payments, (payment) => payment.coupon) 

    @JoinColumn({ name: 'payment_id' }) 
    payments: payments;
}