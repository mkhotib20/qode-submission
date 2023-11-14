import { FastifyRequest } from 'fastify';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

// Not throw 401
const useOptionalAuth = async (req: FastifyRequest) => {
  // @todo with jwt
  // const sub = 'c8ae8079-9ce2-4971-8c95-d7be00060e0c';
  const sub = '';
  if (!sub) {
    return;
  }
  const foundUser = await AppDataSource.getRepository(User).findOne({ where: { id: sub } });

  if (foundUser) {
    return;
  }
  req.user = foundUser;
};

export default useOptionalAuth;

export const useOptionalAuthGuard = { preHandler: useOptionalAuth };
