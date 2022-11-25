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
                secret: 'Fabien',
                expiresIn: '10m',
            },
        );
    }

    private generateRefreshToken(payload: any): string {
        return this.JwtService.sign(
            { payload },
            {
                secret: "Fab",
                expiresIn: "10m"
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

}