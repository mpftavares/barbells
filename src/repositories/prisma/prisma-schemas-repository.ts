import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SchemasRepository } from "../schemas-repository";

export class PrismaSchemasRepository implements SchemasRepository {

  async findByTemplate(templateId: string) {
    const schemas = await prisma.schema.findMany({
      where: {
        templateId,
      }
    })

    return schemas
  }

  async findById(id: string) {
    const schema = await prisma.schema.findUnique({
      where: {
        id,
      },
    })

    return schema
  }

  async create(data: Prisma.SchemaUncheckedCreateInput) {
    const schema = await prisma.schema.create({
      data,
    })

    return schema
  }

  async delete(id: string) {
    const deletedSchema = await prisma.schema.delete({
      where: {
        id,
      },
    });

    if (deletedSchema) {
      return true;
    }

    return false;
  }

  async update(id: string, data: Prisma.SchemaUpdateInput) {

    const schema = await prisma.schema.update({
      data,
      where: {
        id,
      },
    })

    return schema;
  }
}