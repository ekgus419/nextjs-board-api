import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { config } from 'dotenv';
import { Response } from 'express';

config();

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): string {
    const url = process.env.FILE_URL + file.filename;
    return url;
  }

  @Get(':imageName')
  getImage(
    @Param('imageName') imageName: string,
    @Res() response: Response
  ) {
    return response.sendFile(process.env.FILE_PATH + imageName);
  }

}
