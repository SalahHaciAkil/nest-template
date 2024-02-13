import { IsOptional, IsUUID } from 'class-validator';
import { User as UserEntity } from 'src/modules/user/domain/user.entity';
import {
  BaseEntity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class BaseDto {
  @IsOptional()
  @IsUUID()
  created_by_id?: string;

  @IsOptional()
  @IsUUID()
  updated_by_id?: string;
}

class BaseObjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at?: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    nullable: true,
  })
  @JoinColumn({
    name: 'created_by_id',
  })
  created_by?: UserEntity;

  @Column({ name: 'created_by_id', nullable: true })
  created_by_id?: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    nullable: true,
  })
  @JoinColumn({
    name: 'updated_by_id',
  })
  updated_by?: UserEntity;

  @Column({ name: 'updated_by_id', nullable: true })
  updated_by_id?: string;
}

export { BaseDto, BaseObjectEntity };
