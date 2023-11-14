import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AppDataSource } from '@/config/db';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @Index({ unique: true })
  email: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  avatar: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;
}

export const userRepo = () => AppDataSource.getRepository(User);
