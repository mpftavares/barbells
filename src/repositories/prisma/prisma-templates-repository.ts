import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TemplatesRepository } from "../templates-repository";

export class PrismaTemplatesRepository implements TemplatesRepository {

    async findById(id: string) {
        const template = await prisma.template.findUnique({
            where: {
                id,
            },
        })

        return template
    }

    async findByUserId(userId: string) {
        const templates = await prisma.template.findMany({
            where: {
                userId,
            }
        })

        return templates
    }

    async create(data: Prisma.TemplateUncheckedCreateInput) {
        const template = await prisma.template.create({
            data,
        })

        return template
    }

    async delete(id: string) {

        const deletedTemplate = await prisma.template.delete({
            where: {
                id,
            },
        });

        if (deletedTemplate) {
            return true;
        }

        return false;
    }

    async update(id: string, data: Prisma.TemplateUpdateInput) {

        const template = await prisma.template.update({
            data,
            where: {
                id,
            },
        })

        return template;
    }

    async doesTemplateAlreadyExist(name: string) {

        const template = await prisma.template.findFirst({
            where: {
                name
            }
        })

        if (template) {
            return true;
        }

        return false;
    }
}