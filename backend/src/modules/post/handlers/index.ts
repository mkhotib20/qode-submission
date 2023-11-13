import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';

import handleGetPublicPost from './get-public-post';
import handleUploadPost from './upload-post';

const postHandlers: FastifyPluginCallback = (app) => {
  app.post('/upload', useAuthGuard, handleUploadPost);
  app.get('/', handleGetPublicPost);

  return Promise.resolve();
};

export default postHandlers;
