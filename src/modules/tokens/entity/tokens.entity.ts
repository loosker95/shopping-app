import { IsDate } from "class-validator";
import users from "src/modules/users/entity/users.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('tokens')
export default class tokens{

    @PrimaryGeneratedColumn("uuid")
    public id: string

    @Column({nullable: true})
    public user_id: string

    @Column({nullable: true})
    public token: string 

    @Column({nullable: true})
    public refresh_token: string 

    @Column({nullable: true})
    @IsDate()
    public duration: string

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
    async beforeCreateTokens() {
        this.created_at = new Date()
        this.updated_at = new Date()
    } 

    @ManyToOne(type => users)
    @JoinColumn({name: 'user_id'})
    users = users
}