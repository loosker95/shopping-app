import { IsDate } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('carts')
export default class Carts{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    user_id: string

    @Column({ nullable: false })
    product_id: string

    @Column({ nullable: false })
    @IsDate()
    created_at: string 

    @Column({ nullable: false })
    @IsDate()
    updated_at: string

    @BeforeInsert()
    async BeforeCreateCart(){
        this.created_at = Date()
        this.updated_at = Date()
    }

}