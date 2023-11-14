import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comment: string;

  @Column('uuid')
  author_id: string;

  @Column('uuid')
  post_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
}

export const commentRepo = () => AppDataSource.getRepository(Comment);
