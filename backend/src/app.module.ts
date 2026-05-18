import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { OutfitsModule } from './outfits/outfits.module';
import { TipsModule } from './tips/tips.module';
import { BackgroundRemovalModule } from './background-removal/background-removal.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'falaleeva162019',
      database: 'dressup',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
    OutfitsModule,
    TipsModule,
    BackgroundRemovalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    
  ],
})
export class AppModule {}