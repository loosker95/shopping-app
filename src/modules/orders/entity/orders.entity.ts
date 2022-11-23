import { IsDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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
    public created_at: string 

    @UpdateDateColumn({
        nullable: true, 
        type: 'timestamptz'
    })
    @IsDate()
    public updated_at: string
}