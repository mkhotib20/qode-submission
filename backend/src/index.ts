import Fastify from 'fastify';

import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { config } from 'dotenv';
import path from 'path';

import initializeRouters from './initializeRouters';

config();

const main = () => {
  const app = Fastify();
  app.register(fastifyMultipart);

  app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'storage'),
    prefix: '/storage/',
    index: false,
    dotfiles: 'ignore',
  });

  app.setErrorHandler((error, _, reply) => {
    console.log({ error });
    return reply.code(Number(error.code || '500')).send({
      error: error.name || 'Internal Server Error',
      message: error.message,
    });
  });
  app.register(initializeRouters, { prefix: 'v1' });

  app.listen({
    port: Number(process.env.PORT || 3001),
    host: '127.0.0.1',
  });
};

export default main;
