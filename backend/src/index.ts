import Fastify from 'fastify';

import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import openssl from 'openssl-nodejs';
import path from 'path';

import initializeRouters from './initializeRouters';

config();

const main = async () => {
  await new Promise((resolve) => {
    if (!existsSync('openssl/publickey.pem')) {
      openssl(['openssl', 'genrsa', '-out', 'privatekey.pem', '2048'], function () {
        openssl(['openssl', 'rsa', '-in', 'privatekey.pem', '-out', 'publickey.pem', '-pubout'], function (err, buf) {
          console.log(err.toString(), buf.toString());
          resolve(true);
        });
      });
    } else {
      resolve(true);
    }
  });

  const app = Fastify();
  app.register(fastifyMultipart);
  app.register(fastifyCookie);

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
