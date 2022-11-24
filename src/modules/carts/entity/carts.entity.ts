import { IsDate } from "class-validator";
import products from "src/modules/products/entity/products.entity";
import users from "src/modules/users/entity/users.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('carts')
export default class Carts{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    user_id: string

    @Column({ nullable: false })
    product_id: string

    @Column({nullable: true, type: 'timestamptz'})
    @IsDate()
    created_at: Date 

    @UpdateDateColumn({ 
        nullable: true, 
        type: 'timestamptz'
    })
    @IsDate()
    updated_at: Date

    @BeforeInsert()
    async BeforeCreateCart(){
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    @OneToOne(type => users) 
    @JoinColumn({ name: 'user_id' }) 
    users: users;

    @ManyToOne((type) => products, (product_id) => product_id.id)
    @JoinColumn({ name: 'product_id' })
    products: products;

}