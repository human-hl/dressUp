import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('outfits')
@UseGuards(JwtAuthGuard)
export class OutfitsController {
    constructor(private readonly outfitsService: OutfitsService) {}

    @Post()
    create(@Body() dto: CreateOutfitDto, @Req() req) {
        return this.outfitsService.create(dto, req.user.sub);
    }

    @Get()
    findAll(@Req() req) {
        return this.outfitsService.findAll(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req) {
        return this.outfitsService.findOne(+id, req.user.sub);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateOutfitDto, @Req() req) {
        return this.outfitsService.update(+id, dto, req.user.sub);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.outfitsService.remove(+id, req.user.sub);
    }
}