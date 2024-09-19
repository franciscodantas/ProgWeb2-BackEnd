import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class GetDisciplineByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getDisciplineById(id: number) {
        try {
            const discipline = await this.prismaClient.discipline.findUnique({
                where: { id },
                include: {
                    questions: true
                }
            });
            if (!discipline) {
                throw new PrismaClientKnownRequestError("Discipline not found", {code: 'P2025', clientVersion: ''});
            }
            return discipline;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}
