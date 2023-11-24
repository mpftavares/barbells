import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create metric (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new metric', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        timestamp: new Date(),
        weight: 75,
        bodyFat: 25,
      })

    expect(response.statusCode).toEqual(201)
  })

})
