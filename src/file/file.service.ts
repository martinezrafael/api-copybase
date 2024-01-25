import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDTO } from './dto/createFile.dto';
import { FileEntity } from './file.entity';
import { ListFileDto } from './dto/listFile.dto';
import * as csvParser from 'csv-parser'; // Certifique-se de importar o módulo csv-parser
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(createFileDto: CreateFileDTO): Promise<string> {
    const { file } = createFileDto;

    const bufferString = file.buffer.toString('utf-8');

    const results = [];

    const parser = csvParser();
    parser.write(bufferString);
    parser.end();
    parser.on('data', (data) => {
      results.push(data);
    });

    await new Promise((resolve) => parser.on('end', resolve));

    const fileEntities = results.map((result) => {
      const fileEntity = new FileEntity();
      fileEntity.id = uuid();
      fileEntity.quantidade_cobrancas = result['quantidade cobranças'];
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
      await this.fileRepository.save(fileEntity);
    }

    return 'Upload de arquivo realizado com sucesso!';
  }

  async listDataFile() {
    const filesDataSaved = await this.fileRepository.find();
    const filesDataListed = filesDataSaved.map(
      (file) =>
        new ListFileDto(
          file.id,
          file.quantidade_cobrancas,
          file.cobrada_a_cada_x_dias,
          file.data_inicio,
          file.status,
          file.data_status,
          file.data_cancelamento,
          file.valor,
          file.proximo_ciclo,
          file.id_assinante,
        ),
    );
    return filesDataListed;
  }
}
