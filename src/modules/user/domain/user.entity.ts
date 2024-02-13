//user.entity.ts

import { BaseObjectEntity } from 'src/common/base.class';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseObjectEntity {
  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
