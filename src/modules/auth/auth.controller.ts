import { AuthService } from './auth.service';
import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: LoginDto) {
    return dto;
    // return this.authService.signup();
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forbidden')
  forbidden() {
    throw new ForbiddenException('This is a forbidden router');
  }
}
