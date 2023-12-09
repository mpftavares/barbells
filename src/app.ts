import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { workoutsRoutes } from './http/controllers/workouts/routes'
import { exercisesRoutes } from './http/controllers/exercises/routes'
import { setsRoutes } from './http/controllers/sets/routes'
import { metricsRoutes } from './http/controllers/metrics/routes'
import { templatesRoutes } from './http/controllers/templates/routes'
import { schemasRoutes } from './http/controllers/schemas/routes'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '2h',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(workoutsRoutes)
app.register(exercisesRoutes)
app.register(setsRoutes)
app.register(metricsRoutes)
app.register(templatesRoutes)
app.register(schemasRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
