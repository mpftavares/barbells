import { Prisma, Template } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TemplatesRepository } from '../templates-repository'

export class InMemoryTemplatesRepository implements TemplatesRepository {
  public items: Template[] = []

  async findById(id: string) {
    const template = this.items.find((item) => item.id === id)

    if (!template) {
      return null
    }

    return template
  }

  async findByUserId(userId: string) {
    return this.items
      .filter((template) => template.userId === userId)
  }

  async create(data: Prisma.TemplateUncheckedCreateInput) {
    const template = {
      id: randomUUID(),
      userId: data.userId ?? null,
      name: data.name,
    }

    this.items.push(template)

    return template
  }

  async delete(id: string) {

    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    }

    this.items.splice(index, 1)
    return true

  }

  async update(id: string, data: Prisma.TemplateUncheckedUpdateInput) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const existingTemplate = this.items[index];
    const updatedTemplate = {
      ...existingTemplate,
      ...data,
    } as Template;

    this.items[index] = updatedTemplate;

    return updatedTemplate;
  }

  async doesTemplateAlreadyExist(name: string) {

    const template = this.items.find(template => {
      return template.name === name
    });

    if (template) {
      return true;
    }

    return false;
  }
}
