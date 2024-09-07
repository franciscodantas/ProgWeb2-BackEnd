import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GetStudentService } from '../../../services/user/student/GetStudentService';

const prismaClient = new PrismaClient();

export class GetStudentsController {
    async handle(request: Request, response: Response) {
        try {
            const getStudentsService = new GetStudentService();
            const students = await getStudentsService.getAllStudent();
            return response.status(200).json(students);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack,
                });
            }
        }
    }
}
