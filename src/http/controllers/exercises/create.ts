import { makeCreateExerciseUseCase } from '@/use-cases/factories/exercises/make-create-exercise-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createExercise(request: FastifyRequest, reply: FastifyReply) {
    const createExerciseParamsSchema = z.object({
        name: z.string(),
        equipment: z.enum([
            'assisted',
            'barbell',
            'bodyweight',
            'cable',
            'dumbbells',
            'machine',
        ]),
        unilateral: z.optional(z.boolean()),
        targets: z.object({
            create: z.array(
                z.object({
                    muscle: z.enum([
                        'abs',
                        'back',
                        'biceps',
                        'calfs',
                        'chest',
                        'glutes',
                        'hamstrings',
                        'quadriceps',
                        'shoulders',
                        'triceps',
                    ]),
                }),
            ),
        }),
    });

    const { name, equipment, unilateral, targets } = createExerciseParamsSchema.parse(
        request.body,
    );

    const createExerciseUseCase = makeCreateExerciseUseCase();


    await createExerciseUseCase.execute({
        name,
        equipment,
        unilateral,
        userId: request.user.sub,
        targets
    });

    return reply.status(201).send()
}
