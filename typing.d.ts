import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
  interface FastifyReply {
    jsonp: (obj: number | string | null | Record<string, any>, options?: { callbackName: string }) => FastifyReply;
  }
}

export const fastifyJsonp: FastifyPluginCallback

export default fastifyJsonp