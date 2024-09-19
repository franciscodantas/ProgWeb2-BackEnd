import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class GetProfessorsService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    
    async getAllProfessors() {
        try {
            const professors = await this.prismaClient.professor.findMany({
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
