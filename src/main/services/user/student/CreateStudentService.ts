import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../../utils/BcryptUtil';

export class CreateStudentService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

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
            const newStudent = await this.prismaClient.student.create({
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
