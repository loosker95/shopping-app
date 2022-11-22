import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { IsDate } from "class-validator"

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

    @Column({ nullable: false })
    @IsDate()
    public created_at: string

    @Column({ nullable: false })
    @IsDate()
    public updated_at: string

    @BeforeInsert()
    async beforeCreateProducts() {
        this.avatar = 'https://tinyurl.com/3y7bjr8e'
        this.rating = 0.0
        this.created_at = Date()
        this.updated_at = Date()
    }
}