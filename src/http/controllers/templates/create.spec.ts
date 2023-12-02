import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create template (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new template', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const exercise = await createExercise(user)

    const response = await request(app.server)
      .post('/templates')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test template',
        schemas: {
          create: [
            { exerciseId: exercise.id, number: 1, sets: 3, reps: '8-12' },
            { exerciseId: exercise.id, number: 2, sets: 3, reps: '12-15' }
          ],
        },
      })

    expect(response.statusCode).toEqual(201)

    const templateId = response.body.id

    const schemas = await prisma.schema.findMany({
      where: {
        templateId
      },
    })

    expect(schemas.length).toEqual(2)
  })

})
