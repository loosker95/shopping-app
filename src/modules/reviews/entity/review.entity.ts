import { IsDate } from "class-validator";
import products from "src/modules/products/entity/products.entity";
import users from "src/modules/users/entity/users.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('reviews')

export default class reviews{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({ nullable: false })
    public user_id: string

    @Column({ nullable: false })
    public product_id: string
    
    @Column({ nullable: false, type: "float", default: 0.0 })
    public user_score: number
    
    @Column({ nullable: false, type: "float", default: 0.0 })
    public global_score: number
    
    @Column({ nullable: false })
    public comments: string
    
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
    async beforeCreateReviews() {
        this.created_at = new Date()
        this.updated_at = new Date()
    } 

    @ManyToOne(type => users) 
    @JoinColumn({ name: 'user_id' }) 
    users: users;

    @ManyToOne((type) => products, (product_id) => product_id.id)
    @JoinColumn({ name: 'product_id' })
    products: products;

}