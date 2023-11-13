import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  image_path: string;

  @Column('text')
  caption: string;

  @Column('int', { default: 0 })
  like_count: number;

  @Column('int', { default: 0 })
  comment_count: number;

  @Column('uuid')
  author_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;
}

export const postRepo = () => AppDataSource.getRepository(Post);
