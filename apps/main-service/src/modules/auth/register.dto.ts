import { IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString({ message: '用户名必须是字符串' })
  @Length(1, 50, { message: '用户名长度不能超过 50 个字符' })
  // 正则说明：^ 表示开始，$ 表示结束，[a-zA-Z0-9\u4e00-\u9fa5] 允许大小写字母、数字和中文
  // 如果你只想允许英文和数字，去掉 \u4e00-\u9fa5 即可
  @Matches(/^[a-zA-Z0-9\u4E00-\u9FA5]+$/, {
    message: '用户名不能包含特殊符号（仅允许字母、数字、中文）',
  })
  user: string;

  @IsString({ message: '密码必须是字符串' })
  @Length(6, 16, { message: '密码长度必须在 6 到 16 个字符之间' })
  // 正则说明：确保密码由数字、大小写字母及常规符号组成
  // 常规符号集：!@#$%^&*(),.?":{}|<>
  @Matches(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/, {
    message: '密码仅允许包含数字、大小写字母及常规符号',
  })
  pwd: string;
}
