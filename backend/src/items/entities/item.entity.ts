import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: false })
    user!: User;

    @Column()
    name!: string;

    @Column({ nullable: true })
    category!: string;

    @Column({ nullable: true })
    color!: string;

    @Column({ nullable: true })
    material!: string;

    @Column({ nullable: true })
    style!: string;

    @Column({ nullable: true })
    weather!: string;

    @Column({ nullable: true })
    cost!: string;

    @Column({ nullable: true })
    image_url!: string;

    @Column({ nullable: true })
    image_no_bg_url!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}