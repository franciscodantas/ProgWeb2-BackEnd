import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../../utils/BcryptUtil';

const prismaClient = new PrismaClient();

export class CreateProfessorService {
    async createProfessor(data: {
        id: number;
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
        disciplines: number[];
        password: string;
    }) {
        try {
            const hash = await BcryptUtils.hashPassword(data.password);
            const newProfessor = await prismaClient.professor.create({
                data: {
                    id: data.id,
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                    disciplines: {
                        connect: data.disciplines.map(id => ({ id })),
                    },
                    password: hash
                },
            });
            return newProfessor || new Error("Teacher already registered");
        } catch (error) {
            console.error('Error creating professor:', error);
            return error;
        }
    }
}
