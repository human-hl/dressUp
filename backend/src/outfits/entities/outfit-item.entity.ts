import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Outfit } from './outfit.entity';
import { Item } from '../../items/entities/item.entity';

@Entity('outfit_item')
export class OutfitItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Outfit, { onDelete: 'CASCADE' })
    outfit!: Outfit;

    @ManyToOne(() => Item, { onDelete: 'CASCADE' })
    item!: Item;

    @Column({ type: 'float', default: 0 })
    position_x!: number;

    @Column({ type: 'float', default: 0 })
    position_y!: number;

    @Column({ type: 'float', default: 100 })
    width!: number;

    @Column({ type: 'float', default: 100 })
    height!: number;

    @Column({ default: 0 })
    z_index!: number;

    @CreateDateColumn()
    created_at!: Date;
}