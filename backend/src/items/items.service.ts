import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { BackgroundRemovalService } from '../background-removal/background-removal.service';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        private bgRemovalService: BackgroundRemovalService,
    ) {}

    // Создать предмет с картинкой
    async createWithImage(
        createItemDto: CreateItemDto,
        userId: number,
        imageUrl: string | undefined,
    ): Promise<Item> {
        const item = this.itemsRepository.create({
            ...createItemDto,
            image_url: imageUrl || undefined,
            user: { id: userId },
        });

        const savedItem = await this.itemsRepository.save(item) as Item;

        // Удаляем фон асинхронно
        if (imageUrl) {
            this.removeBackground(savedItem, imageUrl);
        }

        return savedItem;
    }

    private async removeBackground(item: Item, imageUrl: string) {
        try {
            const fullUrl = `http://localhost:3000${imageUrl}`;
            const noBgUrl = await this.bgRemovalService.removeBackground(fullUrl);

            const response = await fetch(noBgUrl);
            const buffer = await response.arrayBuffer();
            const filename = `nobg-${Date.now()}.png`;
            const fs = require('fs');
            fs.writeFileSync(`./uploads/${filename}`, Buffer.from(buffer));

            item.image_no_bg_url = `/uploads/${filename}`;
            await this.itemsRepository.save(item);
        } catch (error) {
            console.error('Ошибка удаления фона:', error);
        }
    }

    async findAll(userId: number): Promise<Item[]> {
        const items = await this.itemsRepository.find({
            where: { user: { id: userId } },
            order: { created_at: 'DESC' },
        });
        return items;
    }

    async findOne(id: number, userId: number): Promise<Item> {
        const item = await this.itemsRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!item) {
            throw new NotFoundException('Предмет не найден');
        }
        return item;
    }

    async update(id: number, updateItemDto: UpdateItemDto, userId: number): Promise<Item> {
        const item = await this.findOne(id, userId);
        Object.assign(item, updateItemDto);
        const updated = await this.itemsRepository.save(item);
        return updated as Item;
    }

    async remove(id: number, userId: number): Promise<void> {
        const item = await this.findOne(id, userId);
        await this.itemsRepository.remove(item);
    }
}