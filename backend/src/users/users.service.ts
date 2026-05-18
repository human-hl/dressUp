import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

interface CreateUserDto {
    username: string,
    email: string,
    password_hash: string,
    birthday?: string,
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(data: {
        username: string;
        display_name?: string;
        email: string;
        password_hash: string;
        birthday?: string;
    }): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findById(id: number): Promise<Omit<User, 'password_hash' | 'current_token'> | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;
        const { password_hash, current_token, ...result } = user;
        return result;
    }

    async findByIdWithToken(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateToken(userId: number, token: string): Promise<void> {
        await this.userRepository.update(userId, { current_token: token });
    }

    async updateProfile(userId: number, data: UpdateProfileDto) {
        if (data.password) {
            const bcrypt = require('bcrypt');
            data.password = await bcrypt.hash(data.password, 10);
        }

        await this.userRepository.update(userId, data);

        const foundUser = await this.userRepository.findOne({ where: { id: userId } });

        if (!foundUser) throw new NotFoundException('Пользователь не найден');

        const { password_hash, current_token, ...user } = foundUser;
        return user;
    }
}
