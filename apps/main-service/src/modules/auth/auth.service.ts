import crypto from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { AuthPayload, REFRESH_THRESHOLD, REFRESH_TOKEN_EXPIRE } from './auth-data';
import { RedisService } from '../common/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(query: ApiLoginQuery): Promise<AuthPayload | null> {
    const data = await this.accountService.findUserAndPwd(query);
    if (!data) {
      return null;
    }
    return { user: data.user };
  }

  async generateRefreshToken(payload: AuthPayload) {
    const token = crypto.randomBytes(32).toString('hex');
    await this.redisService.set(`refresh_token:${payload.user}`, token, REFRESH_TOKEN_EXPIRE);
    return token;
  }
  async checkRefreshToken(payload: AuthPayload, token: string) {
    const oldToken = await this.redisService.get(`refresh_token:${payload.user}`);
    return oldToken === token;
  }

  async generateTokens(payload: AuthPayload) {
    const accessToken = await this.jwtService.signAsync<AuthPayload>({
      user: payload.user,
    });
    // 需要基于 payload 查询用户的权限信息等
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  // 登录
  async login(payload: AuthPayload) {
    // 需要基于 payload 查询用户的权限信息等
    const user = await this.accountService.getUserProfile(payload.user);
    const tokens = await this.generateTokens(payload);
    return { ...tokens, user };
  }

  // 注册
  async register(_query: ApiRegisterQuery) {}

  // 检测是否登录
  async check(payload: AuthPayload): Promise<ApiAuthCheckResult> {
    const expireTime = payload.exp!;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = expireTime - currentTime;
    if (timeLeft > 0 && timeLeft < REFRESH_THRESHOLD) {
      return { needRefresh: true };
    }
    return { needRefresh: false };
  }

  // 更新 accessToken
  async refresh(payload: AuthPayload, token: string) {
    const isRefreshTokenValid = await this.checkRefreshToken(payload, token);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.generateTokens(payload);
    return tokens;
  }

  // 登出
  async logout() {}
}
