import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create exercise (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new exercise with muscle targets', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test exercise',
        equipment: 'dumbbells',
        unilateral: true,
        targets: {
          create: [
            { muscle: 'glutes' },
            { muscle: 'hamstrings' },
          ],
        },
      },
      )

    expect(response.statusCode).toEqual(201)

    const exerciseId = response.body.id

    const targets = await prisma.target.findMany({
      where: {
        exerciseId
      },
    })

    expect(targets.length).toEqual(2)

  })
})
