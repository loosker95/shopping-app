import { IsBoolean, IsDate, IsString } from "class-validator";
import coupons from "src/modules/coupons/entity/coupons.entity";
import products from "src/modules/products/entity/products.entity";
import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('payments')
export default class payments{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({nullable: false, type: "float", default: 0.0})
    public amount: number

    @Column()
    public status: boolean

    @Column({nullable: false})
    public payment_method: string

    @Column({nullable: true, type: 'timestamptz'})
    @IsDate()
    public created_at: Date 

    @UpdateDateColumn({
        nullable: true, 
        type: 'timestamptz'
    })
    @IsDate()
    public updated_at: Date

    @BeforeInsert()
    async beforeInsertPayment(){
        this.created_at = new Date()
        this.updated_at = new Date();
    }

    @OneToOne(type => coupons, (coupon) => coupon.payments)
    coupon: coupons

    @OneToMany(type => products, product => product.orders)
    products: products[];

}