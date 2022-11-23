import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

    @Column({ nullable: false })
    @IsNotEmpty()
    public validity: string

    @Column({ nullable: false })
    public discount_rate: string

    @Column({ nullable: false })
    public active: string

    @Column({ nullable: true, type: 'timestamptz' })
    @IsDate()
    public created_at: string

    @UpdateDateColumn({
        nullable: true,
        type: 'timestamptz'
    })
    @IsDate()
    public updated_at: string
}