import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';

import handleGetMe from './get-me';

const authHandlers: FastifyPluginCallback = (app) => {
  app.get('/me', useAuthGuard, handleGetMe);
  return Promise.resolve();
};

export default authHandlers;
