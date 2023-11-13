import { FastifyPluginCallback } from 'fastify';

import authHandlers from './modules/auth/handlers';
import commentHandlers from './modules/comment/handlers';
import postHandlers from './modules/post/handlers';

const initializeRouters: FastifyPluginCallback = (app) => {
  app.register(authHandlers, { prefix: 'auth' });
  app.register(postHandlers, { prefix: 'post' });
  app.register(commentHandlers, { prefix: 'comment' });

  return Promise.resolve();
};

export default initializeRouters;
