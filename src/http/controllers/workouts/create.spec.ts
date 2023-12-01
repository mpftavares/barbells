import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create workout (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new workout', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const exercise = await createExercise(user)

    const response = await request(app.server)
      .post('/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test workout',
        timestamp: new Date(),
        sets: {
          create: [
            { exerciseId: exercise.id, reps: 12 },
            { exerciseId: exercise.id, reps: 10 },
            { exerciseId: exercise.id, reps: 8 },
          ]
        }
      })

    expect(response.statusCode).toEqual(201)

    const workoutId = response.body.id

    const sets = await prisma.set.findMany({
      where: {
        workoutId
      },
    })

    expect(sets.length).toEqual(3)
  })
})
