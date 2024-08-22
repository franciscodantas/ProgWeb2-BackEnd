import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class UpdateProfessorService {
    async updateProfessor(id: number, data: {
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
        disciplines: number[];
    }) {
        try {
            const updatedProfessor = await prismaClient.professor.update({
                where: { id },
                data: {
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                    disciplines: {
                        connect: data.disciplines.map(id => ({ id })),
                    },
                },
            });

            return updatedProfessor;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Professor not found.");
            }
            console.error('Error updating discipline:', error);
            throw error;
        }
    }
}
