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
import * as csvParser from 'csv-parser';

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

    const results = [];
    const parser = csvParser();
    parser.write(bufferString);
    parser.end();
    parser.on('data', (data) => {
      results.push(data);
    });
    await new Promise((resolve) => parser.on('end', resolve));

    await this.fileRepository.saveDataWorksheet(results);

    return { results };
  }

  @Get('/list-data')
  async listData() {
    return this.fileRepository.listDataWorksheet();
  }
}
