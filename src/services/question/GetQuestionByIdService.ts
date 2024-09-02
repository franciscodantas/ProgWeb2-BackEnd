import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetQuestionByIdService {
    async getQuestionById(id: number) {
        try {
            const question = await prismaClient.question.findUnique({
                where: { id },
                include: {
                    student: true,
                    professor: true,
                    discipline: true
                },
            });

            if (!question) {
                throw new Error("Question not found.");
            }

            return question;
        } catch (error) {
            console.error('Error fetching question:', error);
            throw error;
        }
    }
}
