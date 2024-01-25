export class CreateFileDTO {
  file: Express.Multer.File;
  id: string;
  quantidade_cobrancas: string;
  cobrada_a_cada_x_dias: string;
  data_inicio: string;
  status: string;
  data_cancelamento?: string;
  valor: string;
  proximo_ciclo: string;
  id_assinante: string;
}
