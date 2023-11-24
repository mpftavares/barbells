import { makeDeleteUserProfileUseCase } from "@/use-cases/factories/make-delete-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify"


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteProfile = makeDeleteUserProfileUseCase();

        const isUserDeleted = await deleteProfile.execute({
            userId: request.user.sub,
        });

        if (isUserDeleted.success) {
            return reply.status(200).send({ message: 'User profile deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'User profile not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting user profile:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}