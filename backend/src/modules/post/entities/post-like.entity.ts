import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AppDataSource } from '@/config/db';

@Entity({ name: 'post_user_like' })
@Index('post_user_like_uid_pid_unique', ['user_id', 'post_id'], {
  unique: true,
})
export class PostUserLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  post_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
}

export const postUserLikeRepo = () => AppDataSource.getRepository(PostUserLike);
