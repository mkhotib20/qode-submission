import { FastifyRequest } from 'fastify';

import { AppDataSource } from '@/config/db';
import { User } from '@/modules/user/entities/user.entity';
import Unauthorized from '@/utils/errors/Unauthorized';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

const useAuth = async (req: FastifyRequest) => {
  // @todo with jwt
  // const sub = 'c8ae8079-9ce2-4971-8c95-d7be00060e0c';
  const sub = '';

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
