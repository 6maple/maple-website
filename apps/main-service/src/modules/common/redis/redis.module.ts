import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Global() // 设为全局模块
@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: `redis://${config.get<string>('REDIS_HOST')}:${config.get<number>('REDIS_PORT')}`, // 从环境变量读取
        options: {
          password: config.get<string>('REDIS_PASSWORD'),
          keyPrefix: 'main:', // 自动为所有 key 加前缀，防止污染（特别是在多个服务使用同一个redis时）
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService], // 必须导出才能在其他模块使用
})
export class CommonRedisModule {}
