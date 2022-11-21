import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { Length, IsEmail, IsDate, Min } from "class-validator"

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

    @Column({nullable: false})
    @IsDate()
    public created_at: string

    @Column({nullable: false})
    @IsDate()
    public updated_at: string

    @BeforeInsert()
    async beforeCreateDate() {
        this.created_at = Date()
        this.updated_at = Date();
        this.avatar = 'https://tinyurl.com/2fuejv2d'
        this.verified = false;
        this.role = 'user'
    }

}