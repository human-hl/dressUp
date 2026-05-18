import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { OneToMany } from 'typeorm';
import { OutfitItem } from './outfit-item.entity';

@Entity('outfit')
export class Outfit {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    user!: User;

    @OneToMany(() => OutfitItem, outfitItem => outfitItem.outfit, { cascade: true })
    items!: OutfitItem[];

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    category!: string;

    @Column({ nullable: true })
    style!: string;

    @Column({ nullable: true })
    weather!: string;

    @Column({ nullable: true })
    cost!: string;

    @Column({ nullable: true })
    preview_url!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}