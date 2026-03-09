import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AcceptedDataException } from 'src/common/accepted-data-exception';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user',
      passwordField: 'pwd',
    });
  }

  async validate(username: string, pwd: string) {
    const user = await this.authService.validateUser({
      user: username,
      pwd,
    });
    if (!user) {
      throw new AcceptedDataException('app.text.login_failed');
    }
    return user;
  }
}
