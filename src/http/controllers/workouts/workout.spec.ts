import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createWorkout } from '@/utils/test/create-workout'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Workout (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get workout and its volume by id', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const exercise = await createExercise(user)

    const workout = await createWorkout(user, exercise)

    const muscle = 'glutes'

    const response = await request(app.server)
      .get(`/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        muscle
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.workout).toEqual(
      expect.objectContaining({
        name: 'test workout',
      }),
    )
    expect(response.body.volume).toBeTypeOf("number")
    expect(response.body.volume).toBeDefined()
    expect(response.body.volume).toBe(600) // 3 * 10 * 10 * 2 giving utils data
  })
})
