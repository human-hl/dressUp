import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { BackgroundRemovalModule } from '../background-removal/background-removal.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        BackgroundRemovalModule, 
        AuthModule,
        UsersModule,
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [TypeOrmModule, ItemsService], 
})
export class ItemsModule {}