import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createSet } from '@/utils/test/create-set'
import { createWorkout } from '@/utils/test/create-workout'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Set (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get set by id', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const workout = await createWorkout(user)

    const exercise = await createExercise(user)

    const set = await createSet(workout, exercise)

    const response = await request(app.server)
      .get(`/sets/${set.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.set).toEqual(
      expect.objectContaining({
        id: set.id,
      }),
    )
  })
})
