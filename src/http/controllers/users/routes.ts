import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'
import { deleteUser } from './delete'
import { logout } from './logout'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/users/me', { onRequest: [verifyJwt] }, profile)
  app.delete('/users/me', { onRequest: [verifyJwt] }, deleteUser)
  
  app.post('/users/logout', logout)

}
