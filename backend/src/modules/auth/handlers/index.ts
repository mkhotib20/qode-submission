import { FastifyPluginCallback } from 'fastify';

import { useAuthGuard } from '@/middleware/useAuth';

import handleGetMe from './get-me';
import handleLogin from './login';
import handleLogout from './logout';

const authHandlers: FastifyPluginCallback = (app) => {
  app.post('/login', handleLogin);
  app.get('/logout', handleLogout);
  app.get('/me', useAuthGuard, handleGetMe);
  return Promise.resolve();
};

export default authHandlers;
