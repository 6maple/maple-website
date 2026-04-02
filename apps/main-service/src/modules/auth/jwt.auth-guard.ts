import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_AUTH_PUBLIC_KEY } from './auth-data';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuthPublic = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isAuthPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
