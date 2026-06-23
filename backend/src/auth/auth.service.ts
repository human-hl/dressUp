import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

async register(dto: RegisterDto) {
  const hash = await bcrypt.hash(dto.password, 10);

  const user = await this.userService.create({
    username: dto.username,
    display_name: dto.display_name || dto.username,
    email: dto.email,
    password_hash: hash,
    birthday: dto.birthday,
  });

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
  const token = this.jwtService.sign(payload);
  user.current_token = token;
  await this.userService.save(user);

  return {
    message: "Пользователь создан",
    access_token: token,
    user: {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      email: user.email,
      role: user.role,
    },
  };
}

  async login(dto: LoginDto) {
  const user = await this.userService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException("Пользователь не найден");
  }

  const now = new Date();

  if (user.failedLoginAttempts >= 3 && user.lastFailedLogin) {
    const diff = (now.getTime() - new Date(user.lastFailedLogin).getTime()) / 1000;
    if (diff < 60) {
      throw new UnauthorizedException("Слишком много попыток, попробуйте позже");
    } else {
      user.failedLoginAttempts = 0;
      user.lastFailedLogin = null;
      await this.userService.save(user);
    }
  }

  const valid = await bcrypt.compare(dto.password, user.password_hash);

  if (!valid) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    user.lastFailedLogin = new Date();
    await this.userService.save(user);
    throw new UnauthorizedException("Неправильный пароль");
  }

  user.failedLoginAttempts = 0;
  user.lastFailedLogin = null;

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
};

const token = this.jwtService.sign(payload);

  user.current_token = token;
  await this.userService.save(user);

  return {
    access_token: token, // ← тот же токен
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
}