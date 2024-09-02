import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class UpdateQuestionService {
    async updateQuestion(id: number, data: any) {
        try {
            if (data.image) {
                data.image = Buffer.from(data.image, 'base64');
            }

            const updatedQuestion = await prismaClient.question.update({
                where: { id },
                data,
                include: {
                    student: true,
                    professor: true,
                    discipline: true
                }
            });

            return updatedQuestion;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Question not found.");
            }
            console.error('Error updating question:', error);
            throw error;
        }
    }
}
