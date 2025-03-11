import { Injectable } from '@nestjs/common';
// Passport 전략을 확장하기 위한 클래스를 가져온다.
import { PassportStrategy } from '@nestjs/passport';
// JWT를 추출하고 처리하는 Passport의 JWT 전략을 가져온다.
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from 'dotenv';

config();

@Injectable()
export default class JwtAuthStrategey extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // JWT를 검증하기 위한 비밀 키를 환경 변수에서 가져온다.
            secretOrKey: process.env.SECRET_KEY,
            // Bearer Token 에서 Jwt를 가져온다.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // JWT가 유효한 경우 실행
    async validate (payload: any) {
        // payload에서 sub(email)을 추출
        const { sub } = payload;
        const email = sub;
        return email;
    }
}
