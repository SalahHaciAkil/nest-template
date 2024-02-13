import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from 'src/common/interceptors/user.interceptor';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserEntityProvideToken } from 'src/modules/user/constants';
import { User } from 'src/modules/user/domain/user.entity';
import { UserController } from 'src/modules/user/user.controller';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserService } from 'src/modules/user/user.service';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: UserEntityProvideToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
@Module({
  controllers: [UserController],
  imports: [DatabaseModule],

  providers: [
    UserService,
    UserRepository,
    ...userProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class UserModule {}
