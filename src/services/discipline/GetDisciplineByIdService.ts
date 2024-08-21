import { PrismaClient } from '@prisma/client';

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
                return new Error("Discipline not found.");
            }

            return discipline;
        } catch (error) {
            console.error('Error fetching discipline:', error);
            return error;
        }
    }
}
