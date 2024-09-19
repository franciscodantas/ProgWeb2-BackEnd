import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class CreateQuestionService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    async createQuestion(data: {
        title: string;
        content: string;
        answer: string;
        image: string;
        professorId?: number;
        studentId?: number;
        disciplineId: number;
    }) {
        try {
            const disciplineExists = await this.prismaClient.discipline.findUnique({
                where: { id: data.disciplineId },
            });

            if (!disciplineExists) {
                throw new Error("Discipline not found.");
            }

            const existingQuestion = await this.prismaClient.question.findUnique({
                where: { title: data.title },
            });

            if (existingQuestion) {
                throw new Error("Question with the same title already exists.");
            }

            if (data.studentId) {
                const existingStudent = await this.prismaClient.student.findUnique({
                    where: { id: data.studentId },
                });
                if (!existingStudent) {
                    throw new Error("Author not found.");
                }
            } else {
                const existingProfessor = await this.prismaClient.professor.findUnique({
                    where: { id: data.professorId },
                });
                if (!existingProfessor) {
                    throw new Error("Author not found.");
                }
            }

            const base64Image = data.image.trim();
            const imageBuffer = Buffer.from(base64Image, 'base64');

            const question = await this.prismaClient.question.create({
                data: {
                    title: data.title,
                    content: data.content,
                    answer: data.answer,
                    image: imageBuffer,
                    professorId: data.professorId,
                    studentId: data.studentId,
                    disciplineId: data.disciplineId,
                },
            });

            return question;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error('Prisma error:', error);
            }
            throw error;
        }
    }
}