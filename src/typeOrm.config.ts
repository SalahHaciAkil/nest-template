import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/modules/user/domain/user.entity';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: configService.getOrThrow<number>('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_DB'),
  entities: [User],
  migrations: ['src/migrations/*{.ts,.js}'],
});
