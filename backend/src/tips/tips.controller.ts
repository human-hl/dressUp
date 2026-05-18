import { Controller, Get, Param } from '@nestjs/common';
import { TipsService } from './tips.service';
import { NotFoundException } from '@nestjs/common';

@Controller('tips')
export class TipsController {
    constructor(private readonly tipsService: TipsService) {}

    @Get()
    findAll() {
        return this.tipsService.findAll();
    }

    @Get(':id')
async findOne(@Param('id') id: string) {
    const tip = await this.tipsService.findOne(+id);
    if (!tip) throw new NotFoundException('Совет не найден');
    return tip;
}
}