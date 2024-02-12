import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/modules/auth/guards';
@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  // constructor(private cls: ClsService) {}
  @Get()
  @Get('me')
  getMe(@GetUser() user: any) {
    return user;
  }
}
