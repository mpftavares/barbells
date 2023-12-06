import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createExercise } from '@/utils/test/create-exercise'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get All Templates (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get all templates', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        await request(app.server)
            .post('/templates')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test template',
                schemas: {
                    create: [
                        { exerciseId: exercise.id, sets: 3, reps: '8-12' },
                        { exerciseId: exercise.id, sets: 3, reps: '12-15' }
                    ],
                },
            })

        await request(app.server)
            .post('/templates')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'another test template',
                schemas: {
                    create: [
                        { exerciseId: exercise.id, sets: 3, reps: '8-12' },
                        { exerciseId: exercise.id, sets: 3, reps: '12-15' }
                    ],
                },
            })

        const response = await request(app.server)
            .get(`/templates/all`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.templates.length).toEqual(2)
    })
})
