import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService, private jwt: JwtService) {}
  async login(loginInfo: LoginDto) {
    const { accessed_token: token } = await this.singToken(
      '1',
      loginInfo.email,
    );
    return {
      token,
    };
  }
  signup() {
    return {
      msg: 'Hello from signup',
    };
  }

  async singToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('TOKEN_EXPIRATION'),
      secret: this.config.get('TOKEN_SECRET'),
    });

    return {
      accessed_token: token,
    };
  }
}
