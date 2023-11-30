import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createWorkout } from "./create";
import { dateSearch } from "./date-search";
import { deleteWorkout } from "./delete";
import { deleteWorkoutHistory } from "./delete-history";
import { workoutHistory } from "./history";
import { workoutTotal } from "./total";
import { updateWorkout } from "./update";
import { getWorkout } from "./workout";

export async function workoutsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/workouts', createWorkout)

    app.get('/workouts/:workoutId', getWorkout)
    app.get('/workouts/history', workoutHistory)
    app.get('/workouts/total', workoutTotal)
    app.get('/workouts/:startDate/:endDate', dateSearch)

    app.delete('/workouts/:workoutId', deleteWorkout)
    app.delete('/workouts/history', deleteWorkoutHistory)

    app.put('/workouts/:workoutId', updateWorkout)
}