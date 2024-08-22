import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { DeleteStudentService } from '../../../services/user/student/DeleteStudentService';

const prismaClient = new PrismaClient();

export class DeleteStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const deleteStudentService = new DeleteStudentService();
            const deletedUser = await deleteStudentService.deleteStudent(parseInt(id));

            return response.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Student not found.") {
                    return response.status(404).json({ error: error.message });
                }
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
