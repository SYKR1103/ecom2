import {Injectable} from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { TokenPayloadInterface } from '../interfaces/tokenPayload.interface';



// 토큰유효성 검증
// 토큰안에 있는 user가 있냐 아니냐
// 토큰 아직도 유효한지 검증한지



@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {


    constructor(
        private readonly configService : ConfigService,
        private readonly userService : UserService

    ) {
        super({
            // 토큰 로케이팅
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get("JWT_ACCESS_TOKEN_SECRET")

        })
    }

    async validate(payload : TokenPayloadInterface) : Promise<User> {
        return await this.userService.findUserById(payload.userId)
    }
}