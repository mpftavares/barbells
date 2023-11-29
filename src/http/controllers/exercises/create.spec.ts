import { app } from '@/app'
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

  it('should be able to create a new exercise', async () => {

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
            { muscle: 'legs' },
            { muscle: 'glutes' },
            { muscle: 'hamstrings' },
          ],
        },
      },
      )

    expect(response.statusCode).toEqual(201)
  })

})
