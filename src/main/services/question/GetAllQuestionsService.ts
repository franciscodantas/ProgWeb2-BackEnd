import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class GetAllQuestionsService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getAll(pageNumber: any, limitNumber: any, sortBy: string, order: 'asc' | 'desc') {
        try {
            const skip = (pageNumber - 1) * limitNumber;
            const questions = await this.prismaClient.question.findMany({
                skip: skip,
                take: limitNumber,
                include: {
                    student: true,
                    professor: true,
                    discipline: true
                },
                orderBy: {
                    [sortBy]: order,
                }
            });
            return questions;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    }
}