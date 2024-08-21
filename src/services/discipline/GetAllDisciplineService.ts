import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetAllDisciplineService {
    async getAll() {
        try {
            const disciplines = await prismaClient.discipline.findMany({
                include: {
                    questions: true
                }
            });
            return disciplines;
        } catch (error) {
            console.error('Error creating discipline:', error);
            return error;
        }
    }
}