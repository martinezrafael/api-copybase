import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileRepository } from './file.repository';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import * as csvParser from 'csv-parser';
import { CreateFileDTO } from './dto/createFile.dto';
import { FileEntity } from './file.entity';
import { v4 as uuid } from 'uuid';

@Controller('/api/v1')
@UsePipes(new ValidationPipe())
export class FileController {
  constructor(private fileRepository: FileRepository) {}

  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do Arquivo',
    type: CreateFileDTO,
  })
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    //Se não tiver um arquivo, retorna um erro
    if (!file) {
      return { error: 'Nenhum arquivo enviado' };
    }

    const createFileDto = new CreateFileDTO();
    createFileDto.file = file;

    const bufferString = file.buffer.toString('utf-8');

    const results = [];
    const parser = csvParser();
    parser.write(bufferString);
    parser.end();
    parser.on('data', (data) => {
      results.push(data);
    });

    await new Promise((resolve) => parser.on('end', resolve));

    //valida se o formato do arquivo é .xlsx ou .csv
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return { error: 'Formato de arquivo inválido' };
    }

    const fileEntities = results.map((result) => {
      const fileEntity = new FileEntity();
      fileEntity.id = uuid();
      fileEntity.quantidade_cobrancas = fileEntity.quantidade_cobrancas =
        result['quantidade cobranças'];
      fileEntity.cobrada_a_cada_x_dias = result['cobrada a cada X dias'];
      fileEntity.data_inicio = result['data início'];
      fileEntity.status = result['status'];
      fileEntity.data_status = result['data status'];
      fileEntity.data_cancelamento = result['data cancelamento'];
      fileEntity.valor = result['valor'];
      fileEntity.proximo_ciclo = result['próximo ciclo'];
      fileEntity.id_assinante = result['ID assinante'];

      return fileEntity;
    });

    for (const fileEntity of fileEntities) {
      await this.fileRepository.saveDataWorksheet(fileEntity);
    }
    return { message: 'Upload de arquivo realizado com sucesso!' };
  }

  @Get('/list-data')
  async listData() {
    return this.fileRepository.listDataWorksheet();
  }
}
