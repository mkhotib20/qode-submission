import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';

import handleCreateComment from './create-comment';
import handleGetComments from './get-comments';

const commentHandlers: FastifyPluginCallback = (app) => {
  app.get('/:id', handleGetComments);
  app.post('/:id', useAuthGuard, handleCreateComment);
  return Promise.resolve();
};

export default commentHandlers;
