import { FastifyReply } from 'fastify';

import dayjs from 'dayjs';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import path from 'path';

import { RandomUserRsp } from '@/models/random-user/types';
import { userRepo } from '@/modules/user/entities/user.entity';
import Unauthorized from '@/utils/errors/Unauthorized';

import { AUTH_COOKIE_KEY } from '../models/constants';

const handleLogin = async (_, reply: FastifyReply) => {
  // use random user to mock authorization
  const privateKey = readFileSync(path.join(process.cwd(), '/openssl/privatekey.pem'));

  const randomUser = (await fetch('https://randomuser.me/api').then((rsp) => rsp.json())) as RandomUserRsp;
  const [result] = randomUser?.results || [];

  if (!result) throw new Unauthorized('User not found');
  const userData = await userRepo().upsert(
    {
      avatar: result.picture.medium,
      email: result.email,
      full_name: `${result.name.first} ${result.name.last}`,
    },
    ['email'],
  );
  // const token = sign({sub:userData})
  if (!userData.identifiers?.[0]) throw new Error('Internal error');
  const sub = userData.identifiers[0].id;
  const token = sign({ sub }, privateKey, { algorithm: 'RS256' });

  reply.setCookie(AUTH_COOKIE_KEY, token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    // in real life implementataion is not recomended to use long-life token
    expires: dayjs().add(1, 'year').toDate(),
  });

  return { message: 'Success!' };
};

export default handleLogin;
