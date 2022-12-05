import { Controller } from '@nestjs/common';
import { TokensServices } from './tokens.service';
TokensServices

@Controller('tokens')
export class TokensController {
    constructor(
        private readonly tokenService: TokensServices
    ){}
}
