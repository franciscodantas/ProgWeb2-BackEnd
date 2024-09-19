import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../../utils/BcryptUtil';

export class CreateProfessorService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

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
            const newProfessor = await this.prismaClient.professor.create({
                data: {
                    id: data.id,
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                    disciplines: {
                        connect: data.disciplines.map(id => ({ id })),
                    },
                    password: hash,
                },
            });
            return newProfessor;
        } catch (error: unknown) {
            if (error instanceof Error && error.message === "Teacher already registered") {
                throw new Error("Teacher already registered");
            }
            console.error('Error creating professor:', error);
            throw error;
        }
    }
}
