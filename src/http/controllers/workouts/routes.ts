import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createWorkout } from "./create";
import { deleteWorkout } from "./delete";
import { updateWorkout } from "./update";
import { getWorkout } from "./workout";

export async function workoutsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/workouts', createWorkout)
    app.get('/workouts/:workoutId', getWorkout)
    app.delete('/workouts/:workoutId', deleteWorkout)
    app.put('/workouts/:workoutId', updateWorkout)
}