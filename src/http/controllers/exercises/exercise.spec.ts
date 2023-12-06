import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { createExercise } from '@/utils/test/create-exercise';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get Exercise (e2e)', () => {
  let authToken: any;

  beforeAll(async () => {
    await app.ready();
    const { token } = await createAndAuthenticateUser(app);
    authToken = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get exercise by id', async () => {
    const user = await prisma.user.findFirstOrThrow();

    const exercise = await createExercise(user);

    const response = await request(app.server)
      .get(`/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.exercise).toEqual(
      expect.objectContaining({
        name: 'test exercise',
      }),
    );
  });

  it('should not be able to get another users exercise by id', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Mary Doe',
        email: 'marydoe@example.com',
        passwordHash: await hash('123456', 6),
      },
    });

    const exercise = await createExercise(user);

    const response = await request(app.server)
      .get(`/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
  });
});
