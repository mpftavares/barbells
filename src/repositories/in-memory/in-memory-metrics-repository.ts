import { Prisma, Metric } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MetricsRepository } from '../metrics-repository'

export class InMemoryMetricsRepository implements MetricsRepository {
    public items: Metric[] = []

    async findByUser(userId: string) {
        return this.items
            .filter((metric) => metric.userId === userId)
    }

    async findById(id: string) {
        const metric = this.items.find((item) => item.id === id)

        if (!metric) {
            return null
        }

        return metric
    }

    async create(data: Prisma.MetricUncheckedCreateInput) {

        const metric = {
            id: randomUUID(),
            userId: data.userId,
            timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
            weight: data.weight ?? null,
            bodyFat: data.bodyFat ?? null
        };

        this.items.push(metric);

        return metric;
    }

    async delete(id: string) {

        const index = this.items.findIndex((item) => item.id === id)

        if (index === -1) {
            return false
        }

        this.items.splice(index, 1)
        return true

    }

    async deleteAll(ids: string[]) {
        const initialItemCount = this.items.length;

        this.items = this.items.filter((metric) => !ids.includes(metric.id));

        const finalItemCount = this.items.length;
        const deletedCount = initialItemCount - finalItemCount;

        return deletedCount === ids.length;
    }

    async update(id: string, data: Prisma.MetricUncheckedUpdateInput) {
        const index = this.items.findIndex((item) => item.id === id);

        if (index === -1) {
            return null;
        }

        const existingMetric = this.items[index];
        const updatedMetric = {
            ...existingMetric,
            ...data,
        } as Metric;

        this.items[index] = updatedMetric;

        return updatedMetric;
    }
}
