import { Request, Response } from 'express';
import { DisciplineValidation } from '../../validation/DisciplineValidation';
import { CreateDisciplineService } from '../../services/discipline/CreateDisciplineService';

export class CreateDisciplineController {
    async handle(request: Request, response: Response) {
        const { courseCode, curriculumCode, subjectCode, name, type } = request.body;

        try {
            const validationErrors = DisciplineValidation.validate({ courseCode, curriculumCode, subjectCode, name, type });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const disciplineService = new CreateDisciplineService();
            const newDiscipline = await disciplineService.createDiscipline({
                courseCode,
                curriculumCode,
                subjectCode,
                name,
                type,
            });

            if (newDiscipline instanceof Error) {
                return response.status(500).json({ error: newDiscipline.message });
            }

            return response.status(201).json(newDiscipline);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
