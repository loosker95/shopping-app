import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, BeforeUpdate } from "typeorm";
import { Length, IsEmail, IsDate, Min } from "class-validator"
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class users {

    @PrimaryGeneratedColumn("uuid") 
    public id: string

    @Column()
    @Length(3)
    public name: string

    @Column({ nullable: false, unique: true })
    @IsEmail()
    public email: string;

    @Column({nullable: false})
    @Min(8)
    public password: string;

    @Column({
        default: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
    })
    public avatar: string;

    @Column({default: false})
    public verified: boolean;

    @Column({default: 'user'})
    public role: string;

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
    async beforeCreateDate() {
        this.created_at = new Date()
        this.updated_at = new Date();
        this.avatar = 'https://tinyurl.com/2fuejv2d'
        this.verified = false;
        this.role = 'user'
    }

    @BeforeUpdate()
    async beforeUpdatePasswd(){
        const salt = await bcrypt.genSalt(10);
        await bcrypt.hash(this.password, salt);
    }

}