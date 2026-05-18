import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tip')
export class Tip {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'text', nullable: true })
    content!: string;

    @Column({ default: 'tip' })
    type!: string;

    @Column({ nullable: true })
    image_url!: string;

    @CreateDateColumn()
    created_at!: Date;
}