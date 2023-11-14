import { DataSource } from 'typeorm';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/models/constants/env';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { PostUserLike } from '@/modules/post/entities/post-like.entity';
import { Post } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Post, User, Comment, PostUserLike],
  subscribers: [],
  migrations: [],
  logger: 'simple-console',
});
