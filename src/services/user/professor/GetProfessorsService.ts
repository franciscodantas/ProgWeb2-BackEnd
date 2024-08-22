import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetProfessorsService {
    async getAllProfessors() {
        try {
            const professors = await prismaClient.professor.findMany({
                include: {
                    Question: true,
                    disciplines: true,
                },
            });

            return professors;
        } catch (error) {
            console.error('Error fetching professors:', error);
            throw error;
        }
    }
}
