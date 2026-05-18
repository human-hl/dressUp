import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tip } from './entities/tip.entity';

@Injectable()
export class TipsService {
    constructor(
        @InjectRepository(Tip)
        private tipsRepository: Repository<Tip>,
    ) {}

    async findAll(): Promise<Tip[]> {
        return this.tipsRepository.find({ order: { created_at: 'DESC' } });
    }

    async findOne(id: number): Promise<Tip | null> {
    return this.tipsRepository.findOne({ where: { id } });
}
}