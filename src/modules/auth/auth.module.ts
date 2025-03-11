import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtAuthStrategey from './jwt-auth.strategey';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleConfig, passportJwtConfig } from 'config';
import { DataAccessModule } from 'modules/data-access/data-access.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register(passportJwtConfig),
    JwtModule.register(jwtModuleConfig),
    DataAccessModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthStrategey, AuthService],
  exports: [JwtAuthStrategey]
})
export class AuthModule {}
