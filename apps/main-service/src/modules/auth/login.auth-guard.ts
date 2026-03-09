import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AcceptedDataException } from 'src/common/accepted-data-exception';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {
  handleRequest<TUser = any>(err: unknown, user: TUser, info: any) {
    if (err || !user) {
      // 检查是否是因为字段缺失导致的
      if (info?.message === 'Missing credentials') {
        throw new AcceptedDataException('app.text.login_missing_credentials');
      }
      throw err || new UnauthorizedException('app.text.login_failed');
    }
    return user;
  }
}
