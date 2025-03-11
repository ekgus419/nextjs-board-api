import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerModuleConfig, serveStaticModuleConfig } from 'config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MulterModule.register(multerModuleConfig),
    ServeStaticModule.forRoot(serveStaticModuleConfig)
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
