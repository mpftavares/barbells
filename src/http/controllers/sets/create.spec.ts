import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createWorkout } from '@/utils/test/create-workout'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create set (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new set', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow();

    const workout = await createWorkout(user)

    const exercise = await createExercise(user)

    const response = await request(app.server)
      .post('/sets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        workoutId: workout.id,
        exerciseId: exercise.id,
        reps: 10,

      })

    expect(response.statusCode).toEqual(201)
  })

})
