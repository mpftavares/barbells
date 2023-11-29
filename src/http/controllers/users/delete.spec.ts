import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete User Profile Use Case (e2e)', () => {

    let authToken: any

    beforeAll(async () => {
        await app.ready()
        const { token } = await createAndAuthenticateUser(app)
        authToken = token
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete user profile', async () => {

        const deleteUserResponse = await request(app.server)
            .delete('/users/me')
            .set('Authorization', `Bearer ${authToken}`)
            .send();

        expect(deleteUserResponse.statusCode).toEqual(200);

        expect(deleteUserResponse.body).toEqual(
            expect.objectContaining({
                message: 'User profile deleted successfully 👌',
            }),
        );
    });
});