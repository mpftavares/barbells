import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeDeleteWorkoutUseCase } from "@/use-cases/factories/workouts/make-delete-workout-use-case";
import { makeGetWorkoutUseCase } from "@/use-cases/factories/workouts/make-get-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteWorkout(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {
    try {
        const deleteWorkout = makeDeleteWorkoutUseCase();

        const workoutId = request.params.workoutId

        const getWorkout = makeGetWorkoutUseCase()

        const { workout } = await getWorkout.execute({
            workoutId: workoutId,
        })

        verifyPermission(workout.userId, request, reply)

        const isWorkoutDeleted = await deleteWorkout.execute({
            workoutId: workoutId
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