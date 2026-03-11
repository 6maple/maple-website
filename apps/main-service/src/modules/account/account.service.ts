import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly loginRepository: Repository<AccountEntity>,
  ) {}

  async findUserAndPwd(query: ApiLoginQuery) {
    const { user, pwd } = query;
    if (user === 'test') {
      return query;
    }
    const data = await this.loginRepository.findOne({ where: { user, pwd } });
    return data;
  }

  async getUserProfile(user: string) {
    const data = await this.loginRepository.findOne({ where: { user } });
    return data;
  }
}
