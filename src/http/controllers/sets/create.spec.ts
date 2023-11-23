import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
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

    const workout = await prisma.workout.create({
      data: {
        name: 'test workout',
        timestamp: new Date,
        userId: user.id,
      },
    });

    const exercise = await prisma.exercise.create({
      data: {
        name: 'test exercise',
        equipment: 'dumbells',
        unilateral: true,
        userId: user.id
      },
    });

    const response = await request(app.server)
      .post('/sets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        workoutId: workout.id,
        exerciseId: exercise.id,
        weight: 100,
        reps: 10,

      })

    expect(response.statusCode).toEqual(201)
  })

})
