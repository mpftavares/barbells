import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Workout (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get workout by id', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const workout = await prisma.workout.create({
      data: {
        name: 'test workout',
        timestamp: new Date(),
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.workout).toEqual(
      expect.objectContaining({
        name: 'test workout',
      }),
    )
  })
})
