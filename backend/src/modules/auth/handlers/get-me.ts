import { FastifyRequest } from 'fastify';

const handleGetMe = async (req: FastifyRequest) => {
  return req.user;
};

export default handleGetMe;
