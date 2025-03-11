import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataAccessModule } from 'modules/data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
