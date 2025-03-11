import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv'

config();

const jwtModuleConfig: JwtModuleOptions = {
    secret: process.env.SECRET_KEY,
    signOptions: {
        expiresIn: 3600,
    },
};

export default jwtModuleConfig;