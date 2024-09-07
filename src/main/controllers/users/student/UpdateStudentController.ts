import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StudentValidation } from '../../../validation/StudentValidation';
import { UpdateStudentService } from '../../../services/user/student/UpdateStudentService';

const prismaClient = new PrismaClient();

export class UpdateStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, identityProviderId, code, email, password } = request.body;

        try {
            const validationErrors = StudentValidation.validate({ id, name, identityProviderId, code, email, password });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const updateStudentService = new UpdateStudentService();
            const updatedUser = await updateStudentService.updateStudent(
                parseInt(id),
                {
                    name,
                    identityProviderId,
                    code,
                    email,
                    password
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
