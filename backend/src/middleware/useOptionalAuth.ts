import { FastifyRequest } from 'fastify';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';
import getSubFromReq from '@/utils/getSubFromReq';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

// Not throw 401
const useOptionalAuth = async (req: FastifyRequest) => {
  const sub = await getSubFromReq(req);
  if (!sub) {
    return;
  }
  const foundUser = await AppDataSource.getRepository(User).findOne({ where: { id: sub } });

  if (!foundUser) {
    return;
  }
  req.user = foundUser;
};

export default useOptionalAuth;

export const useOptionalAuthGuard = { preHandler: useOptionalAuth };
