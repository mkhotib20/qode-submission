import { FastifyRequest } from 'fastify';

import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import path from 'path';

import { AUTH_COOKIE_KEY } from '@/modules/auth/models/constants';

const getSubFromReq = async (req: FastifyRequest) => {
  const publicKey = readFileSync(path.join(process.cwd(), '/openssl/publickey.pem'));
  const token = req.cookies[AUTH_COOKIE_KEY];

  if (!token) {
    return undefined;
  }
  const payload = verify(token, publicKey) as Record<string, string>;

  if (!payload) {
    return undefined;
  }

  const sub = payload.sub;
  return sub;
};

export default getSubFromReq;
