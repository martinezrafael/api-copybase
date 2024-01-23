import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FileController],
  providers: [FileRepository],
})
export class FileModule {}
