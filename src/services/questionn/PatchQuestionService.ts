import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class PatchQuestionService {
    async patchQuestion(id: number, updates: any) {
        try {
            const updatedQuestion = await prismaClient.question.update({
                where: { id },
                data: updates,
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
