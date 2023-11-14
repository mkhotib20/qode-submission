import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';
import { useOptionalAuthGuard } from '@/middleware/useOptionalAuth';

import handleAttemptLike from './attempt-like';
import handleGetDetail from './get-detail';
import handleGetPublicPost from './get-public-post';
import handleUploadPost from './upload-post';

const postHandlers: FastifyPluginCallback = (app) => {
  app.post('/upload', useAuthGuard, handleUploadPost);
  app.post('/like/:id', useAuthGuard, handleAttemptLike);
  app.get('/:id', useOptionalAuthGuard, handleGetDetail);
  app.get('/', useOptionalAuthGuard, handleGetPublicPost);

  return Promise.resolve();
};

export default postHandlers;
