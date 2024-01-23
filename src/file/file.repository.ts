import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  private worksheetData = [];

  async saveDataWorksheet(file) {
    this.worksheetData.push(file);
  }

  async listDataWorksheet() {
    return this.worksheetData;
  }
}
