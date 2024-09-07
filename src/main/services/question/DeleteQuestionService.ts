import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class DeleteQuestionService {
    async deleteQuestion(id: number) {
        try {
            const deletedQuestion = await prismaClient.question.delete({
                where: { id }
            });
            return deletedQuestion;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Question not found.");
            }
            console.error('Error deleting question:', error);
            throw error;
        }
    }
}
