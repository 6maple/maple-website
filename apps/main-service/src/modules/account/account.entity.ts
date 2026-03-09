import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @ObjectIdColumn()
  uid: string;
  @Column({ type: 'varchar', length: 50 })
  user: string;
  @Column({ type: 'varchar', length: 16 })
  pwd: string;
}
