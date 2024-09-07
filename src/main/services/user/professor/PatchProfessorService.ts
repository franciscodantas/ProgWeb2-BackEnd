import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class PatchProfessorService {
    async patchProfessor(id: number, updates: {
        name?: string;
        identityProviderId?: string;
        code?: string;
        email?: string;
        disciplines?: number[];
    }) {
        try {
            const { disciplines, ...otherUpdates } = updates;

            const updatedProfessor = await prismaClient.professor.update({
                where: { id },
                data: {
                    ...otherUpdates,
                    ...(disciplines && {
                        disciplines: {
                            set: disciplines.map(id => ({ id })),
                        },
                    }),
                },
                include:{
                    disciplines:true
                },
            });

            return updatedProfessor;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Professor not found.");
            }
            console.error('Error updating Professor:', error);
            throw error;
        }
    }
}
