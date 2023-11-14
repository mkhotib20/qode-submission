import { FastifyRequest } from 'fastify';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';
import Unauthorized from '@/utils/errors/Unauthorized';
import getSubFromReq from '@/utils/getSubFromReq';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

const useAuth = async (req: FastifyRequest) => {
  const sub = await getSubFromReq(req);

  if (!sub) {
    throw new Unauthorized('Bad credentials');
  }
  const foundUser = await AppDataSource.getRepository(User).findOne({ where: { id: sub } });

  if (!foundUser) {
    throw new Unauthorized('Bad credentials');
  }

  req.user = foundUser;
};

export default useAuth;

export const useAuthGuard = { preHandler: useAuth };
