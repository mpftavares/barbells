import { Prisma, Schema } from '@prisma/client'

export interface SchemasRepository {
  findByTemplate(templateId: string): Promise<Schema[]>
  findById(id: string): Promise<Schema | null>
  create(data: Prisma.SchemaUncheckedCreateInput): Promise<Schema>
  update(id: string, data: Prisma.SchemaUncheckedUpdateInput): Promise<Schema | null>
  delete(id: string): Promise<boolean>
}
