export class ListFileDto {
  constructor(
    readonly id: string,
    readonly quantidade_cobrancas: string,
    readonly cobrada_a_cada_x_dias: string,
    readonly data_inicio: string,
    readonly status: string,
    readonly data_status: string,
    readonly data_cancelamento: string,
    readonly valor: string,
    readonly proximo_ciclo: string,
    readonly id_assinante: string,
  ) {}
}
