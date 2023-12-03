import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createSchema } from '@/utils/test/create-schema'
import { createTemplate } from '@/utils/test/create-template'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Schema (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get schema by id', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const exercise = await createExercise(user)

    const template = await createTemplate(user, exercise)

    const schema = await createSchema(template, exercise)

    const response = await request(app.server)
      .get(`/schemas/${schema.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.schema).toEqual(
      expect.objectContaining({
        id: schema.id,
      }),
    )
  })
})
