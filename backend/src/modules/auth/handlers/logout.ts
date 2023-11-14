import { FastifyReply } from 'fastify';

import dayjs from 'dayjs';

import { AUTH_COOKIE_KEY } from '../models/constants';

const handleLogout = (_, reply: FastifyReply) => {
  reply.setCookie(AUTH_COOKIE_KEY, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    // in real life implementataion is not recomended to use long-life token
    expires: dayjs().subtract(1, 'year').toDate(),
  });
  return { message: 'Success' };
};

export default handleLogout;
