import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateStudentService } from '../../../services/user/student/UpdateStudentService';

const prismaClient = new PrismaClient();

export class UpdateStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, identityProviderId, code, email } = request.body;

        try {
            const updateStudentService = new UpdateStudentService();
            const updatedUser = await updateStudentService.updateStudent(
                parseInt(id),
                {
                    name,
                    identityProviderId,
                    code,
                    email,
                },
            );

            return response.status(200).json(updatedUser);
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
