import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('/api/v1')
export class FileController {
  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    const bufferString = file.buffer.toString('utf-8');

    return { bufferString };
  }
}
