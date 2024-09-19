import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetStudentByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getStudentById(id: any) {
        try {
            const student = await this.prismaClient.student.findUnique({
                where: { id },
                include: {
                    Question: true,
                },
            });
    
            if (!student) {
                throw new Error("Student not found.");
            }
    
            return student;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Student not found.");
            }
            console.error('Error fetching Student:', error);
            throw error;
        }
    }
}
