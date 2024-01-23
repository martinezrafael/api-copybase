import { Controller, Post } from '@nestjs/common';

@Controller('/api/v1')
export class FileController {
  @Post('/file-upload')
  async fileUpload() {
    return { message: 'Upload de arquivo realizado com sucesso!' };
  }
}
