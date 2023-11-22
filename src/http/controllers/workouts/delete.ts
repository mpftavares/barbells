import { makeDeleteWorkoutUseCase } from "@/use-cases/factories/make-delete-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteWorkout(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {
    try {
        const deleteWorkout = makeDeleteWorkoutUseCase();

        const isWorkoutDeleted = await deleteWorkout.execute({
            workoutId: request.params.workoutId
        });

        if (isWorkoutDeleted.success) {
            return reply.status(200).send({ message: 'Workout deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Workout not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting workout:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}