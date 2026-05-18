import {
    Controller, Get, Post, Body, Patch, Param, Delete,
    UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ItemsService } from './items.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BackgroundRemovalService } from '../background-removal/background-removal.service';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly bgRemovalService: BackgroundRemovalService,
    ) {}

    @Post('remove-bg')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, 'temp-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    async removeBackground(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('Файл не загружен');

        const imageUrl = `/uploads/${file.filename}`;
        const fullUrl = `http://localhost:3000${imageUrl}`;

        try {
           const noBgPath = await this.bgRemovalService.removeBackground(imageUrl);
            // Удаляем временный файл
            const fs = require('fs');
            try { fs.unlinkSync(`./uploads/${file.filename}`); } catch {}
            return { url: noBgPath };
        } catch (error) {
            const fs = require('fs');
            try { fs.unlinkSync(`./uploads/${file.filename}`); } catch {}
            throw new InternalServerErrorException('Не удалось удалить фон');
        }
    }
    @Post()
@UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
        },
    }),
}))
async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
) {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.itemsService.createWithImage(body, req.user.sub, imageUrl);
}

    @Get()
    findAll(@Req() req) {
        return this.itemsService.findAll(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req) {
        return this.itemsService.findOne(+id, req.user.sub);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto, @Req() req) {
        return this.itemsService.update(+id, updateItemDto, req.user.sub);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.itemsService.remove(+id, req.user.sub);
    }
}