import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createTemplate } from "./create";
import { deleteTemplate } from "./delete";
import { updateTemplate } from "./update";
import { getTemplate } from "./template";

export async function templatesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/templates', createTemplate)
    app.get('/templates/:templateId', getTemplate)
    app.delete('/templates/:templateId', deleteTemplate)
    app.put('/templates/:templateId', updateTemplate)
}