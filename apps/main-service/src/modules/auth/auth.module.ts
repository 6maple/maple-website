import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccountModule } from '../account/account.module';
import { LoginStrategy } from './login.strategy';
import { PassportModule } from '@nestjs/passport';
import { CONFIG_JWT_SECRET } from './auth-data';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>(CONFIG_JWT_SECRET),
        signOptions: { expiresIn: '2H' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginStrategy, JwtStrategy],
})
export class AuthModule {}
