import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import tokens from "./entity/tokens.entity";


@Injectable()
export class TokensServices {
    constructor(
        @InjectRepository(tokens)
        private tokensRepository: Repository<tokens>,
        private readonly JwtService: JwtService
    ) { }

    
    private generateAccessToken(payload: any) {
        return this.JwtService.sign(
            { payload },
            {
                secret: process.env.TOKEN_SECRET,
                expiresIn: process.env.TOKEN_EXPIRE_TIME,
            },
        );
    }

    private generateRefreshToken(payload: any): string {
        return this.JwtService.sign(
            { payload },
            {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME
            },
        );
    }

    public generateTokens(payload: any){
        const tokens = {
            access_token: this.generateAccessToken(payload),
            refresh_token: this.generateRefreshToken(payload)
        }
        return tokens
    }

    async CheckIfUserHasToken(id: string){
        const IdUser = this.tokensRepository.count({where: {user_id: id}})
        return IdUser
    }

    async DeleteToKenForUser(id: string){
        const findToken = await this.tokensRepository.find({where: {user_id: id}})
        await this.tokensRepository.remove(findToken)
        return findToken
    }

    public async saveToken(tokenData: any){
        const data = this.tokensRepository.create(tokenData)
        await this.tokensRepository.save(data)
        return data
    }

}