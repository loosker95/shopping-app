import { IsBoolean, IsDate, IsString } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('payments')
export default class payments{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({nullable: false, type: "float", default: 0.0})
    public amount: number

    @Column()
    public status: boolean

    @Column({nullable: false})
    public payment_method: string

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
    async beforeInsertPayment(){
        this.created_at = new Date()
        this.updated_at = new Date();
    }

}