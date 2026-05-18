import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outfit } from './entities/outfit.entity';
import { OutfitItem } from './entities/outfit-item.entity';
import { Item } from '../items/entities/item.entity';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';

@Injectable()
export class OutfitsService {
    constructor(
        @InjectRepository(Outfit)
        private outfitsRepository: Repository<Outfit>,
        @InjectRepository(OutfitItem)
        private outfitItemsRepository: Repository<OutfitItem>,
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ) {}

    async create(dto: CreateOutfitDto, userId: number): Promise<Outfit> {
        const outfit = this.outfitsRepository.create({
            name: dto.name,
            category: dto.category,
            style: dto.style,
            weather: dto.weather,
            cost: dto.cost,
            user: { id: userId },
        });

        const savedOutfit = await this.outfitsRepository.save(outfit);

        if (dto.items && dto.items.length > 0) {
            for (const itemDto of dto.items) {
                const item = await this.itemsRepository.findOne({ where: { id: itemDto.itemId } });
                if (item) {
                    const outfitItem = this.outfitItemsRepository.create({
                        outfit: { id: savedOutfit.id },
                        item,
                        position_x: itemDto.position_x,
                        position_y: itemDto.position_y,
                        width: itemDto.width,
                        height: itemDto.height,
                        z_index: itemDto.z_index,
                    });
                    await this.outfitItemsRepository.save(outfitItem);
                }
            }
        }

        return this.findOne(savedOutfit.id, userId);
    }

    async findAll(userId: number): Promise<Outfit[]> {
        return this.outfitsRepository.find({
            where: { user: { id: userId } },
            relations: ['items', 'items.item'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number, userId: number): Promise<Outfit> {
        const outfit = await this.outfitsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['items', 'items.item'],
        });
        if (!outfit) throw new NotFoundException('Комбинация не найдена');
        return outfit;
    }

    async update(id: number, dto: UpdateOutfitDto, userId: number): Promise<Outfit> {
        const outfit = await this.findOne(id, userId);
        Object.assign(outfit, { name: dto.name, category: dto.category, style: dto.style, weather: dto.weather, cost: dto.cost });
        await this.outfitsRepository.save(outfit);

        if (dto.items) {
            await this.outfitItemsRepository.delete({ outfit: { id } });
            for (const itemDto of dto.items) {
                const item = await this.itemsRepository.findOne({ where: { id: itemDto.itemId } });
                if (item) {
                    const outfitItem = this.outfitItemsRepository.create({
                        outfit: { id },
                        item,
                        position_x: itemDto.position_x,
                        position_y: itemDto.position_y,
                        width: itemDto.width,
                        height: itemDto.height,
                        z_index: itemDto.z_index,
                    });
                    await this.outfitItemsRepository.save(outfitItem);
                }
            }
        }

        return this.findOne(id, userId);
    }

    async remove(id: number, userId: number): Promise<void> {
        const outfit = await this.findOne(id, userId);
        await this.outfitsRepository.remove(outfit);
    }
}