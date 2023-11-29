import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMetric } from "./create";
import { deleteMetric } from "./delete";
import { updateMetric } from "./update";
import { getMetric } from "./metric";
import { metricHistory } from "./history";
import { deleteMetricHistory } from "./delete-history";

export async function metricsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/metrics', createMetric)
    app.get('/metrics/:metricId', getMetric)
    app.get('/metrics/history', metricHistory)
    app.delete('/metrics/:metricId', deleteMetric)
    app.delete('/metrics/history', deleteMetricHistory)
    app.put('/metrics/:metricId', updateMetric)
}