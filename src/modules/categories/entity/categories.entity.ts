import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";


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

    @Column({ nullable: false })
    @IsDate()
    created_at: string

    @Column({ nullable: false })
    @IsDate()
    updated_at: string
 
    @BeforeInsert()
    async beforeCreatecategories(){
        this.image = 'https://tinyurl.com/pttnfwdu'
        this.created_at = Date()
        this.updated_at = Date()
    }
}