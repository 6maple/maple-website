import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDataImpl } from 'src/common/response-data';
import { LoginAuthGuard } from './login.auth-guard';
import {
  AuthPayload,
  AuthPublic,
  COOKIE_REFRESH_TOKEN,
  HEADER_X_ACCESS_TOKEN,
  REFRESH_TOKEN_EXPIRE,
} from './auth-data';
import { RegisterDto } from './register.dto';

import type { Request, Response } from 'express';

const resolveRequestUser = (req: Request) => req.user! as AuthPayload;
const writeTokens = (res: Response, accessToken: string, refreshToken: string) => {
  res.setHeader(HEADER_X_ACCESS_TOKEN, accessToken);
  res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_EXPIRE * 1000,
  });
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthPublic()
  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      resolveRequestUser(req),
    );
    writeTokens(res, accessToken, refreshToken);
    return ResponseDataImpl.buildSuccess(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return ResponseDataImpl.buildSuccess();
  }

  @Get('check')
  async check(@Req() req: Request) {
    const user = resolveRequestUser(req);
    const data = await this.authService.check(user);
    return ResponseDataImpl.buildSuccess(data);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies[COOKIE_REFRESH_TOKEN];
    const { accessToken, refreshToken } = await this.authService.refresh(
      resolveRequestUser(req),
      token,
    );
    writeTokens(res, accessToken, refreshToken);
    return ResponseDataImpl.buildSuccess();
  }

  @Post('logout')
  async logout() {
    await this.authService.logout();
  }
}
