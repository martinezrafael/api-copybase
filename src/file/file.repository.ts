import { Injectable } from '@nestjs/common';
import { FileEntity } from './file.entity';

@Injectable()
export class FileRepository {
  private worksheetData: FileEntity[] = [];

  async saveDataWorksheet(file: FileEntity) {
    this.worksheetData.push(file);
  }

  async listDataWorksheet() {
    return this.worksheetData;
  }
}
