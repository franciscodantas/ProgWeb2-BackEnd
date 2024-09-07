import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetAllQuestionsService {
    async getAll(pageNumber: any, limitNumber: any, sortBy: string, order: 'asc' | 'desc') {
        try {
            const skip = (pageNumber - 1) * limitNumber;
            const questions = await prismaClient.question.findMany({
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
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Questions not found.");
            }
            console.error('Error fetching questions:', error);
            throw error;
        }
    }
}