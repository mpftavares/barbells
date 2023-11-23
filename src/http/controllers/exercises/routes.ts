import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createExercise } from "./create";
import { deleteExercise } from "./delete";
import { updateExercise } from "./update";
import { getExercise } from "./exercise";

export async function exercisesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/exercises', createExercise)
    app.get('/exercises/:exerciseId', getExercise)
    app.delete('/exercises/:exerciseId', deleteExercise)
    app.put('/exercises/:exerciseId', updateExercise)
}