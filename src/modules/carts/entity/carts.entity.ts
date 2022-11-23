import { IsDate } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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

}