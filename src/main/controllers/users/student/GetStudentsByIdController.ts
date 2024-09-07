import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { GetStudentByIdService } from '../../../services/user/student/GetStudentByIdService';

const prismaClient = new PrismaClient()

export class GetStudentsByIdController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const getStudentByIdService = new GetStudentByIdService();
            const student = await getStudentByIdService.getStudentById(parseInt(id));

            return response.status(200).json(student);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Student not found.") {
                    return response.status(404).json({ error: error.message });
                }
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack,
                });
            }
        }
    }
}
