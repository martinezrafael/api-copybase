import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade_cobrancas', length: 20, nullable: false })
  quantidade_cobrancas: string;

  @Column({ name: 'cobrada_a_cada_x_dias', length: 20, nullable: false })
  cobrada_a_cada_x_dias: string;

  @Column({ name: 'data_inicio', length: 40, nullable: false })
  data_inicio: string;

  @Column({ name: 'status', length: 50, nullable: false })
  status: string;

  @Column({ name: 'data_status', length: 40, nullable: false })
  data_status: string;

  @Column({ name: 'data_cancelamento', length: 40 })
  data_cancelamento: string;

  @Column({ name: 'valor', length: 50, nullable: false })
  valor: string;

  @Column({ name: 'proximo_ciclo', length: 40, nullable: false })
  proximo_ciclo: string;

  @Column({ name: 'id_assinante', length: 20, nullable: false })
  id_assinante: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
