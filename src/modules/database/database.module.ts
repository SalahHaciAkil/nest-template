import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize when true will auto create tables on the DB
        //NOTE this is only for development and should not be used in production
        // synchronize: configService.getOrThrow('NODE_ENV') === 'development',
        migrations: ['src/migrations/*{.ts,.js}'],
        dropSchema: false,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
