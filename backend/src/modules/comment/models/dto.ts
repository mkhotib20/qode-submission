import { FastifyRequest } from 'fastify';

export type CreateCommentRequest = FastifyRequest<{
  Params: { id: string };
  Body: { comment: string };
}>;
