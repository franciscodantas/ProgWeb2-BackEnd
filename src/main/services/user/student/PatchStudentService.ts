import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PatchStudentService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    
    async patchStudent(id: number, data: any) {
        try {

            const updatedStudent = await this.prismaClient.student.update({
                where: { id },
                data: data,
                include:{
                    Question: true
                },
            });

            return updatedStudent;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Student not found.");
            }
            console.error('Error updating Student:', error);
            throw error;
        }
    }
}
