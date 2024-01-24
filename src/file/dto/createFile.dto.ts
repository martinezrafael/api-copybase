import { IsNotEmpty, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateFileDTO {
  @IsString({ message: 'Formato de dados Inválido' })
  file: Express.Multer.File;

  @IsString()
  @IsNotEmpty({ message: 'O id não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Você deve informar uma quantidade de cobranças' })
  quantidade_cobrancas: string;

  @IsString()
  @IsNotEmpty({
    message: 'Você deve informar a cada quantos dias é realizada a cobrança',
  })
  cobrada_a_cada_x_dias: string;

  @IsString()
  @IsNotEmpty({ message: 'Data Início não pode estar vazia' })
  data_inicio: string;

  @IsString()
  @IsNotEmpty({ message: 'Status não deve estar vazio' })
  status: string;

  @IsString()
  data_cancelamento: string;

  @IsString()
  @IsNotEmpty({ message: 'Você deve informar um valor' })
  valor: string;

  @IsString()
  @IsNotEmpty({ message: 'Você deve informar a data do próximo ciclo' })
  proximo_ciclo: string;

  @IsString()
  @IsNotEmpty({ message: 'Você deve informar o id do assinante' })
  id_assinante: string;
}
