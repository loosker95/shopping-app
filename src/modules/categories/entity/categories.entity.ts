import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsDate } from "class-validator";
import products from "src/modules/products/entity/products.entity";


@Entity('categories')
export default class categories{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({ nullable: false })
    category_name: string 

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false })
    image: string

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
    async beforeCreatecategories(){
        this.image = 'https://tinyurl.com/pttnfwdu'
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}