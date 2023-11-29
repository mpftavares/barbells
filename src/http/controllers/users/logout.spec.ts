import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Logout (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to logout', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const logoutResponse = await request(app.server)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(logoutResponse.statusCode).toEqual(200)
    })

})
