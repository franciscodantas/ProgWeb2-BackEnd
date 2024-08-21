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

            return discipline || new Error("Discipline not found.");
        } catch (error) {
            console.error('Error fetching discipline:', error);
            return error;
        }
    }
}
