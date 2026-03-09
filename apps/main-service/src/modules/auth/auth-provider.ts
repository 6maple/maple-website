import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.auth-guard';
import { type Provider } from '@nestjs/common';

// 不管在哪注册，都是全局的
export const JwtGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
