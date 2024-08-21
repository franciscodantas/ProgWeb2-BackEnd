import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateProfessorService {
    async createProfessor(data: {
        id: number;
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
        disciplines: number[];
    }) {
        try {
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
                },
            });
            return newProfessor || new Error("Teacher already registered");
        } catch (error) {
            console.error('Error creating professor:', error);
            return error;
        }
    }
}
