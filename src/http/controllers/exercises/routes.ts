import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createExercise } from "./create";
import { deleteExercise } from "./delete";
import { updateExercise } from "./update";
import { getExercise } from "./exercise";
import { searchExercises } from "./search";

export async function exercisesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/exercises', createExercise)
    app.get('/exercises/:exerciseId', getExercise)
    app.get('/exercises/search', searchExercises)
    app.delete('/exercises/:exerciseId', deleteExercise)
    app.put('/exercises/:exerciseId', updateExercise)
}