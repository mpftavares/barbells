import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import { createWorkout } from '@/utils/test/create-workout'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Workout Volume (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get workout volume by workout id', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        const workout = await createWorkout(user, exercise)

        const muscle = 'glutes'

        const response = await request(app.server)
            .get(`/workouts/${workout.id}/volume`)
            .set('Authorization', `Bearer ${token}`)
            .query({
                muscle
            })
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.volume).toBeTypeOf("number")
        expect(response.body.volume).toBeDefined()
        expect(response.body.volume).toBe(600) // 3 * 10 * 10 * 2 giving utils data
    })
})
