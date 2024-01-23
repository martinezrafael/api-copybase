// Importações necessárias do Nest.js e de outras bibliotecas
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

// Controlador para manipulação de arquivos
@Controller('/api/v1')
@UsePipes(new ValidationPipe())
export class FileController {
  // Injeção de dependência do FileRepository
  constructor(private fileRepository: FileRepository) {}

  // Método para lidar com o upload de arquivos
  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file')) // Usando interceptor de arquivo para processar uploads
  @ApiConsumes('multipart/form-data') // Configuração do Swagger para consumo de multipart/form-data
  @ApiBody({
    description: 'Dados do Arquivo',
    type: CreateFileDTO, // Utilizando DTO para definir a estrutura dos dados do arquivo
  })
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'Nenhum arquivo enviado' };
    }
    // Criação de um objeto DTO e atribuição do arquivo recebido
    const createFileDto = new CreateFileDTO();
    createFileDto.file = file;

    // Conversão do buffer do arquivo para uma string
    const bufferString = file.buffer.toString('utf-8');

    // Processamento do arquivo CSV usando a biblioteca csv-parser
    const results = [];
    const parser = csvParser();
    parser.write(bufferString);
    parser.end();
    parser.on('data', (data) => {
      results.push(data);
    });

    // Aguarda o término do processamento antes de prosseguir
    await new Promise((resolve) => parser.on('end', resolve));

    //valida se o formato do arquivo é .xlslx ou .csv
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return { error: 'Formato de arquivo inválido' };
    }

    await this.fileRepository.saveDataWorksheet(results);
    // Retorna os resultados do processamento
    return { results };
  }

  // Método para listar dados previamente salvos
  @Get('/list-data')
  async listData() {
    return this.fileRepository.listDataWorksheet();
  }
}
