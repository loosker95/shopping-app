import { IsDate } from "class-validator";
import payments from "src/modules/payments/entity/payments.entity";
import products from "src/modules/products/entity/products.entity";
import users from "src/modules/users/entity/users.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('orders')
export default class orders{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({nullable: false})
    public user_id: string

    @Column({nullable: false})
    public product_id: string

    @Column({nullable: false})
    public payment_id: string

    @Column({nullable: false, type: "float", default: 0.0})
    public amount: number

    @Column({nullable: false, type: "float", default: 0.0})
    public original_price: number

    @Column({nullable: true})
    public address: string

    @Column({nullable: true})
    public contact: string

    @Column({nullable: false})
    public status: boolean

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
    async beforeInsertOrders(){
        this.created_at = new Date()
        this.updated_at = new Date();
    }

    @ManyToOne(type => users) 
    @JoinColumn({ name: 'user_id' }) 
    users: users;

    @ManyToOne(type => products) 
    @JoinColumn({ name: 'product_id' }) 
    products: products;

    @ManyToOne(type => payments) 
    @JoinColumn({ name: 'payment_id' }) 
    payments: payments;
}