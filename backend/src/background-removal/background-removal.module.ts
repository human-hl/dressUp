import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackgroundRemovalService } from './background-removal.service';


@Module({
    imports: [ConfigModule],
    providers: [BackgroundRemovalService],
    exports: [BackgroundRemovalService],
})
export class BackgroundRemovalModule {}