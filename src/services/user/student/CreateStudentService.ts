import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateStudentService {
    async createStudent(data: {
        id: number;
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
    }) {
        try {
            const newStudent = await prismaClient.student.create({
                data: {
                    id: data.id,
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                },
            });
            return newStudent || new Error("Student already registered");
        } catch (error) {
            console.error('Error creating student:', error);
            return error;
        }
    }
}
