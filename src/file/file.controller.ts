import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileRepository } from './file.repository';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('/api/v1')
export class FileController {
  constructor(private fileRepository: FileRepository) {}

  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do Arquivo',
    type: FileRepository,
  })
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    const bufferString = file.buffer.toString('utf-8');

    this.fileRepository.saveDataWorksheet(bufferString);
    return { bufferString };
  }

  @Get('/list-data')
  async listData() {
    return this.fileRepository.listDataWorksheet();
  }
}
