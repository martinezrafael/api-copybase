// Importação necessária do Express para definição do tipo Multer.File
import { Express } from 'express';
import { IsNotEmpty } from 'class-validator';

// Classe de Transferência de Dados (DTO) para o upload de arquivos
export class CreateFileDTO {
  @IsNotEmpty({ message: 'O arquivo não pode estar vazio' })
  file: Express.Multer.File;
}
