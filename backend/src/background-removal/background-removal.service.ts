import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackgroundRemovalService {

    async removeBackground(imagePath: string): Promise<string> {
        try {
            const { removeBackground } = await import('@imgly/background-removal-node');

            const fullPath = path.join(process.cwd(), imagePath);
            const imageBuffer = fs.readFileSync(fullPath);

            // Определяем тип изображения по расширению
            const ext = path.extname(imagePath).toLowerCase();
            const mimeType = ext === '.png' ? 'image/png' 
                : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
                : ext === '.webp' ? 'image/webp'
                : 'image/png';

            // Передаём Blob с правильным типом
            const blob = new Blob([imageBuffer], { type: mimeType });
            const resultBlob = await removeBackground(blob, {
    model: 'medium', // качественнее (small | medium | large)
    output: {
        format: 'image/png',
        quality: 1,
    },
});
            const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());

            const filename = `nobg-${Date.now()}.png`;
            fs.writeFileSync(path.join(process.cwd(), 'uploads', filename), resultBuffer);

            return `/uploads/${filename}`;
        } catch (error) {
            console.error('Ошибка удаления фона:', error);
            throw new InternalServerErrorException('Не удалось удалить фон');
        }
    }
}