import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { IsDate } from "class-validator"
import categories from "src/modules/categories/entity/categories.entity";
import orders from "src/modules/orders/entity/orders.entity";
import reviews from "src/modules/reviews/entity/review.entity";


@Entity('products')
export default class products {

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({ nullable: false })
    public category_id: string

    @Column({ nullable: false })
    public product_name: string

    @Column({ nullable: false })
    public description: string

    @Column({ nullable: true })
    public avatar: string

    @Column({ nullable: false })
    public brand: string

    @Column({ nullable: false })
    public stock: string

    @Column({ nullable: false, type: "float", default: 0.0 })
    public price: number

    @Column({ nullable: false, type: "float", default: 0.0 })
    public rating: number

    @Column({nullable: true, type: 'timestamptz'})
    @IsDate()
    public created_at: Date

    @IsDate()
    @UpdateDateColumn({ 
        nullable: true, 
        type: 'timestamptz'
    })
    public updated_at: Date

    @BeforeInsert()
    async beforeCreateProducts() {
        this.avatar = 'https://tinyurl.com/3y7bjr8e'
        this.rating = 0.0
        this.created_at = new Date()
        this.updated_at = new Date()
    } 
    
    @OneToMany(type => orders, order => order.products)
    orders: orders[];

    @OneToMany(type => reviews, review => review.products)
    reviews: reviews[];

    @ManyToMany((type) => categories, categories=>categories.id) 
    @JoinTable({ name: 'products_categories' }) 
    categories: categories;
    
    
}
