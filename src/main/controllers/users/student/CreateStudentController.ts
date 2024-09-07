import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateStudentService } from '../../../services/user/student/CreateStudentService';
import { StudentValidation } from '../../../validation/StudentValidation';

const prismaClient = new PrismaClient();

export class CreateStudentController {
    async handle(request: Request, response: Response) {
        const { id, name, identityProviderId, code, email, password } = request.body;

        try {
            const validationErrors = StudentValidation.validate({ id, name, identityProviderId, code, email, password});
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const createStudentService = new CreateStudentService();
            const newStudent = await createStudentService.createStudent(
                {
                    id,
                    name,
                    identityProviderId,
                    code,
                    email,
                    password
                },
            );

            if (newStudent instanceof Error) {
                return response.status(400).json({ error: newStudent.message });
            }

            return response.status(201).json(newStudent);
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
