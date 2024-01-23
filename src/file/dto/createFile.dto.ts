import { IsString } from 'class-validator';
import { Express } from 'express';

export class CreateFileDTO {
  @IsString()
  file: Express.Multer.File;
}
