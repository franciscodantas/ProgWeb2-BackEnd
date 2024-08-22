import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetProfessorByIdService {
    async getProfessorById(id: number) {
        try {
            const professor = await prismaClient.professor.findUnique({
                where: { id },
                include: {
                    Question: true,
                    disciplines: true,
                },
            });

            return professor;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Professor not found.");
            }
            console.error('Error fetching professor:', error);
            throw error;
        }
    }
}
