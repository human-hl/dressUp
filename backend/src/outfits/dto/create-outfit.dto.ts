import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateOutfitDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsString()
    @IsOptional()
    style?: string;

    @IsString()
    @IsOptional()
    weather?: string;

    @IsString()
    @IsOptional()
    cost?: string;

    @IsArray()
    @IsOptional()
    items?: {
        itemId: number;
        position_x: number;
        position_y: number;
        width: number;
        height: number;
        z_index: number;
    }[];
}