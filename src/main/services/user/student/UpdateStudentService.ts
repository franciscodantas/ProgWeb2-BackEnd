import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BcryptUtils } from '../../../utils/BcryptUtil';

export class UpdateStudentService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async updateStudent(id: number, data: {
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
        password: string;
    }) {
        try {
            const hash = await BcryptUtils.hashPassword(data.password);
            const updatedStudent = await this.prismaClient.student.update({
                where: { id },
                data: {
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                    password: hash,
                },
            });

            return updatedStudent;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Student not found.");
            }
            console.error('Error updating student:', error);
            throw error;
        }
    }
}
