import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class GetProfessorByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getProfessorById(id: number) {
        try {
            const professor = await this.prismaClient.professor.findUnique({
                where: { id },
                include: {
                    Question: true,
                    disciplines: true,
                },
            });

            if (!professor) {
                throw new Error("Professor not found.");
            }

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
