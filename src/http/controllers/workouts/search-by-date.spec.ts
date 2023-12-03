import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
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

        await prisma.workout.createMany({
            data: [
                {
                    name: 'test workout',
                    timestamp: new Date('2023-11-20'),
                    userId: user.id
                },
                {
                    name: 'another test workout',
                    timestamp: new Date('2023-11-28'),
                    userId: user.id
                },
                {
                    name: 'one more test workout',
                    timestamp: new Date('2023-11-21'),
                    userId: user.id
                }
            ],
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
    })
})
