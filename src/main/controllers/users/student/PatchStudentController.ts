import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StudentValidation } from '../../../validation/StudentValidation';
import { PatchStudentService } from '../../../services/user/student/PatchStudentService';

const prismaClient = new PrismaClient();

export class PatchStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const validationErrors = StudentValidation.validatePatch(updates);
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const patchStudentService = new PatchStudentService();
            const updatedUser = await patchStudentService.patchStudent(parseInt(id), updates);

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
