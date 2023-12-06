import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createTemplate } from '@/utils/test/create-template'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create schema (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new schema', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const exercise = await createExercise(user)

    const template = await createTemplate(user, exercise)

    const response = await request(app.server)
      .post('/schemas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        templateId: template.id,
        exerciseId: exercise.id,
        sets: 3,
        reps: '8-12'
      })

    expect(response.statusCode).toEqual(201)
  })

})
