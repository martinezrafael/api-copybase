import { Module } from '@nestjs/common';
import { FileController } from './file/file.controller';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [CsvModule],
  controllers: [FileController],
  providers: [],
})
export class AppModule {}
