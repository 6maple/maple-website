import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthPublic } from '../auth/auth-data';

import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getUserProfile(@Req() req: Request) {
    console.log('getUserProfile', req.user);
    return this.userService.getUserProfile('test');
  }

  @AuthPublic()
  @Get('public')
  getPublic() {
    return 'public';
  }
}
