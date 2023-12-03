import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search User Workouts By Date (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search user workouts by date range', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        await prisma.workout.create({
            data: {
                name: 'test workout',
                timestamp: new Date('2023-11-20'),
                userId: user.id,
                sets: {
                    create: [
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                    ]
                },
            }
        })

        await prisma.workout.create({
            data: {
                name: 'test workout',
                timestamp: new Date('2023-11-21'),
                userId: user.id,
                sets: {
                    create: [
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                    ]
                },
            }
        })

        await prisma.workout.create({
            data: {
                name: 'test workout',
                timestamp: new Date('2023-11-23'),
                userId: user.id,
                sets: {
                    create: [
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                        { exerciseId: exercise.id, reps: 10, weight: 10 },
                    ]
                },
            }
        })

        const from = '2023-11-20'
        const to = '2023-11-21'

        const response = await request(app.server)
            .get(`/workouts/search-by-date`)
            .query({
                from,
                to
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.workouts).toHaveLength(2)
        expect(response.body.volume).toBe(1200)  // 2 * 3 * 10 * 10 * 2 giving utils data
    })
})
