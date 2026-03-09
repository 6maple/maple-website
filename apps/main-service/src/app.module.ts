import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuardProvider } from './modules/auth/auth-provider';
import { CommonRedisModule } from './modules/common/redis/redis.module';

@Module({
  imports: [
    // 加载环境变量（全局生效）
    ConfigModule.forRoot({ isGlobal: true }),
    // 配置 TypeORM 连接 MongoDB（使用环境变量动态配置）
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb', // 关键：指定数据库类型为 mongodb
        url: configService.get<string>('MONGODB_URL'), // 从环境变量读取连接地址
        autoLoadEntities: true,
        synchronize: true, // 开发环境：自动同步实体到数据库（生产环境禁用！）
        logging: true, // 可选：打印 SQL/操作日志，方便调试
      }),
      inject: [ConfigService], // 注入环境变量服务
    }),
    CommonRedisModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtGuardProvider],
})
export class AppModule {}
