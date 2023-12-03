import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createTemplate } from "./create";
import { deleteTemplate } from "./delete";
import { updateTemplate } from "./update";
import { getTemplate } from "./template";
import { getAllTemplates } from "./all-templates";

export async function templatesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/templates', createTemplate)
    app.get('/templates/:templateId', getTemplate)
    app.get('/templates/all', getAllTemplates)
    app.delete('/templates/:templateId', deleteTemplate)
    app.put('/templates/:templateId', updateTemplate)
}