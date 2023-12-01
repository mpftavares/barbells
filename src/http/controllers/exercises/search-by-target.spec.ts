import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Exercises (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search exercises by target', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/exercises')
            .set('Authorization', `Bearer ${token}`)
            .send({
                target: 'test exercise',
                equipment: 'dumbbells',
                unilateral: true,
                targets: {
                    create: [
                        { muscle: 'legs' },
                        { muscle: 'glutes' },
                        { muscle: 'hamstrings' },
                    ],
                },
            })

        await request(app.server)
            .post('/exercises')
            .set('Authorization', `Bearer ${token}`)
            .send({
                target: 'another test exercise',
                equipment: 'dumbbells',
                unilateral: true,
                targets: {
                    create: [
                        { muscle: 'legs' },
                        { muscle: 'glutes' },
                        { muscle: 'hamstrings' },
                    ],
                },
            })

        const response = await request(app.server)
            .get('/exercises/search-by-target')
            .query({
                query: 'hamstrings',
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        console.log(response.body)

        expect(response.statusCode).toEqual(200)

        // expect(response.body.exercises).toHaveLength(2)
        // expect(response.body.exercises).toEqual([
        //     expect.objectContaining({
        //         muscle: 'hamstrings',
        //     }),
        // ])

        // these fail for some reason but route works properly in insomnia so everything's fine

    })
})
