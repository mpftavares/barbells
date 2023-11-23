import { makeDeleteExerciseUseCase } from "@/use-cases/factories/make-delete-exercise-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteExercise(request: FastifyRequest<{ Params: { exerciseId: string } }>, reply: FastifyReply) {
    try {
        const deleteExercise = makeDeleteExerciseUseCase();

        const isExerciseDeleted = await deleteExercise.execute({
            exerciseId: request.params.exerciseId
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