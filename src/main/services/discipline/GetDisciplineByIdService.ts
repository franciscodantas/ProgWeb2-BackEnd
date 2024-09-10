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
            if (!discipline) {
                throw new PrismaClientKnownRequestError("Discipline not found", {code: 'P2025', clientVersion: ''});
            }
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
