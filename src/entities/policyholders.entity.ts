import { BaseEntity, Entity, Tree, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, TreeChildren, TreeParent } from 'typeorm';
import { Policyholder } from '@interfaces/policyholders.interface';

@Entity('policyholders')
@Tree('closure-table')
export class PolicyholdersEntity extends BaseEntity implements Policyholder {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column()
  name: string;

  @Column()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  registration_date: Date;

  @Column({ nullable: true })
  introducer_code: string;

  @Column()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  update_date: Date;

  @TreeChildren()
  children: PolicyholdersEntity[];

  @TreeParent()
  parent: PolicyholdersEntity;
}
