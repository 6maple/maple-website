import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService {
  constructor(private readonly accountService: AccountService) {}

  async getUserProfile(user: string) {
    return this.accountService.getUserProfile(user);
  }
}
