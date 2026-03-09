import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /**
   * 设置对象（自动序列化）
   * @param key 键
   * @param value 值（支持可json化的对象）
   * @param ttl 过期时间（秒，可选）
   */
  async setJSON(key: string, value: object, ttl?: number): Promise<'OK'> {
    const stringValue = JSON.stringify(value);
    return this.set(key, stringValue, ttl);
  }

  /**
   * 获取对象（自动反序列化）
   */
  async getJSON<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  /**
   * 设置值
   * @param key 键
   * @param value 值
   * @param ttl 过期时间（秒，可选）
   * @returns
   */
  async set(key: string, value: string | number, ttl?: number): Promise<'OK'> {
    if (ttl) {
      return this.redis.set(key, value, 'EX', ttl);
    }
    return this.redis.set(key, value);
  }
  /**
   * 获取值
   */
  async get(key: string): Promise<string | null> {
    const data = await this.redis.get(key);
    if (!data) {
      return null;
    }
    return data;
  }

  /**
   * 删除键
   */
  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
