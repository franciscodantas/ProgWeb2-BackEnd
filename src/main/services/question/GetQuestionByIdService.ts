import { PrismaClient } from '@prisma/client';

export class GetQuestionByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getQuestionById(id: number) {
        try {
            const question = await this.prismaClient.question.findUnique({
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
