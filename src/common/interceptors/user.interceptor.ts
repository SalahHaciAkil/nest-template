import { ClsService } from 'nestjs-cls';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/user/user.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    private readonly usersService: UserService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      this.cls.set('isPublic', true);
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      const authUser = await this.usersService.getUserById(user.id);
      this.cls.set('user', authUser);
    }
    return next.handle();
  }
}
