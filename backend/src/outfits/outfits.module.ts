import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { OutfitItem } from './entities/outfit-item.entity';
import { Item } from '../items/entities/item.entity';
import { OutfitsController } from './outfits.controller';
import { OutfitsService } from './outfits.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Outfit, OutfitItem, Item]),
        AuthModule,
        UsersModule,
    ],
    controllers: [OutfitsController],
    providers: [OutfitsService],
    exports: [OutfitsService],
})
export class OutfitsModule {}