import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetDisciplineByIdService {
    async getDisciplineById(id: number) {
        try {
            const discipline = await prismaClient.discipline.findUnique({
                where: { id },
                include: {
                    questions: true
                }
            });

            return discipline;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}
