import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { createMetric } from '@/utils/test/create-metric';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get Metric (e2e)', () => {
  let authToken: any;

  beforeAll(async () => {
    await app.ready();
    const { token } = await createAndAuthenticateUser(app);
    authToken = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get metric by id', async () => {

    const user = await prisma.user.findFirstOrThrow();

    const metric = await createMetric(user);

    const response = await request(app.server)
      .get(`/metrics/${metric.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.metric).toEqual(
      expect.objectContaining({
        weight: 75,
      }),
    );
  });

  it('should not be able to get another users metric by id', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Mary Doe',
        email: 'marydoe@example.com',
        passwordHash: await hash('123456', 6),
      },
    });

    const metric = await createMetric(user);

    const response = await request(app.server)
      .get(`/metrics/${metric.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
  });
});
