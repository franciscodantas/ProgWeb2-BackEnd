import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class DeleteQuestionService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async deleteQuestion(id: number) {
        try {
            const deletedQuestion = await this.prismaClient.question.delete({
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
