import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../../utils/BcryptUtil';

const prismaClient = new PrismaClient();

export class CreateStudentService {
    async createStudent(data: {
        id: number;
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
        password: string;
    }) {
        try {
            const hash = await BcryptUtils.hashPassword(data.password);
            const newStudent = await prismaClient.student.create({
                data: {
                    id: data.id,
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                    password: hash,
                },
            });
            return newStudent || new Error("Student already registered");
        } catch (error) {
            console.error('Error creating student:', error);
            return error;
        }
    }
}
