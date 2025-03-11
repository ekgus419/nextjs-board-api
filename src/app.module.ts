import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMMysqlConfig } from 'config';
import { AuthModule } from 'modules';
import { BoardModule } from 'modules';
import { UserModule } from 'modules';
import { FileModule } from 'modules';
import { SearchModule } from 'modules';
import { DataAccessModule } from 'modules';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMMysqlConfig),
    AuthModule,
    BoardModule,
    UserModule,
    FileModule,
    SearchModule,
    DataAccessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
