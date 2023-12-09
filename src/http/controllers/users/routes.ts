import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'
import { deleteUser } from './delete'
import { logout } from './logout'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.delete('/me', { onRequest: [verifyJwt] }, deleteUser)

  app.post('/logout', logout)

}
