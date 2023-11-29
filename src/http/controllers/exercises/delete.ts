import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeDeleteExerciseUseCase } from "@/use-cases/factories/exercises/make-delete-exercise-use-case";
import { makeGetExerciseUseCase } from "@/use-cases/factories/exercises/make-get-exercise-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteExercise(request: FastifyRequest<{ Params: { exerciseId: string } }>, reply: FastifyReply) {
    try {
        const deleteExercise = makeDeleteExerciseUseCase();

        const exerciseId = request.params.exerciseId

        const getExercise = makeGetExerciseUseCase()

        const { exercise } = await getExercise.execute({
            exerciseId: exerciseId,
        })

        verifyPermission(exercise.userId, request, reply)

        const isExerciseDeleted = await deleteExercise.execute({
            exerciseId: exerciseId
        });

        if (isExerciseDeleted.success) {
            return reply.status(200).send({ message: 'Exercise deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Exercise not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting exercise:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}