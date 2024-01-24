import { IsString } from 'class-validator';
import { Express } from 'express';

export class CreateFileDTO {
  @IsString({ message: 'Formato de dados Inválido' })
  file: Express.Multer.File;
}
