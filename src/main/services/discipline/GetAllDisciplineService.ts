import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetAllDisciplineService {
    async getAll(pageNumber?: any, limitNumber?: any) {
        try {
            const skip = pageNumber && limitNumber ? (pageNumber - 1) * limitNumber : 0;
            const take = limitNumber || undefined;
            const disciplines = await prismaClient.discipline.findMany({
                skip: skip,
                take: take,
                include: {
                    questions: true
                }
            });
            return disciplines;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}