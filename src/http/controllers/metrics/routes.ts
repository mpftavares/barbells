import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMetric } from "./create";
import { deleteMetric } from "./delete";
import { updateMetric } from "./update";
import { getMetric } from "./metric";

export async function metricsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/metrics', createMetric)
    app.get('/metrics/:metricId', getMetric)
    app.delete('/metrics/:metricId', deleteMetric)
    app.put('/metrics/:metricId', updateMetric)
}