import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSet } from "./create";
import { deleteSet } from "./delete";
import { getSet } from "./set";
import { updateSet } from "./update";

export async function setsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/sets', createSet)
    app.get('/sets/:setId', getSet)
    app.delete('/sets/:setId', deleteSet)
    app.put('/sets/:setId', updateSet)
}