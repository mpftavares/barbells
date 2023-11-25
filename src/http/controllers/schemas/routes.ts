import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSchema } from "./create";
import { deleteSchema } from "./delete";
import { getSchema } from "./schema";
import { updateSchema } from "./update";

export async function schemasRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/schemas', createSchema)
    app.get('/schemas/:schemaId', getSchema)
    app.delete('/schemas/:schemaId', deleteSchema)
    app.put('/schemas/:schemaId', updateSchema)
}