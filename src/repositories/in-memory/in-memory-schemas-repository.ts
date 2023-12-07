import { Prisma, Schema } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { SchemasRepository } from '../schemas-repository'

export class InMemorySchemasRepository implements SchemasRepository {
  public items: Schema[] = []

  async findByTemplate(templateId: string) {
    return this.items
      .filter((schema) => schema.templateId === templateId)
  }

  async findById(id: string) {
    const schema = this.items.find((item) => item.id === id)

    if (!schema) {
      return null
    }

    return schema
  }

  async create(data: Prisma.SchemaUncheckedCreateInput) {

    const schema = {
      id: randomUUID(),
      templateId: data.templateId,
      exerciseId: data.exerciseId,
      number: data.number,
      sets: data.sets,
      reps: data.reps,
    };

    this.items.push(schema);

    return schema;
  }

  async delete(id: string) {

    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    }

    this.items.splice(index, 1)
    return true

  }

  async update(id: string, data: Prisma.SchemaUncheckedUpdateInput) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const existingSchema = this.items[index];
    const updatedSchema = {
      ...existingSchema,
      ...data,
    } as Schema;

    this.items[index] = updatedSchema;

    return updatedSchema;
  }
}
