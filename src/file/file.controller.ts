import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateFileDTO } from './dto/createFile.dto';

@Controller('/api/v1')
@UsePipes(new ValidationPipe())
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do Arquivo',
    type: CreateFileDTO,
  })
  async fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDTO,
  ) {
    try {
      createFileDto.file = file;

      const message = await this.fileService.uploadFile(createFileDto);
      return { message };
    } catch (error) {
      console.error('Erro no upload de arquivo:', error);
      return { error: 'Ocorreu um erro durante o upload do arquivo.' };
    }
  }

  @Get('/list-data')
  async listData() {
    const filedSaved = await this.fileService.listDataFile();
    return filedSaved;
  }
}
