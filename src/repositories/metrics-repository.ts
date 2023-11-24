import { Prisma, Metric } from '@prisma/client'

export interface MetricsRepository {
  findByUser(userId: string): Promise<Metric[]>
  findById(id: string): Promise<Metric | null>
  create(data: Prisma.MetricUncheckedCreateInput): Promise<Metric>
  update(id: string, data: Prisma.MetricUncheckedUpdateInput): Promise<Metric | null>
  delete(id: string): Promise<boolean>
}
