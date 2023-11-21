import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { workout } from "./workout";

export async function workoutsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/workouts', create)
    app.get('/workouts/:workoutId', workout)
}