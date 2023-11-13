import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';

import handleCreateComment from './create-comment';

const commentHandlers: FastifyPluginCallback = (app) => {
  app.post('/:id', useAuthGuard, handleCreateComment);
  return Promise.resolve();
};

export default commentHandlers;
