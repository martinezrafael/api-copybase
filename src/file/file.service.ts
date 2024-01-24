import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListFileDto } from './dto/listFile.dto';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

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
