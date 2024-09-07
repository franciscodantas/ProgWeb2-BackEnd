import { Request, Response } from 'express';
import { DisciplineValidation } from '../../validation/DisciplineValidation';
import { UpdateDisciplineService } from '../../services/discipline/UpdateDisciplineService';

export class UpdateDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { courseCode, curriculumCode, subjectCode, name, type } = request.body;

        try {
            const validationErrors = DisciplineValidation.validate({ courseCode, curriculumCode, subjectCode, name, type });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const disciplineService = new UpdateDisciplineService();
            const result = await disciplineService.updateDiscipline(parseInt(id), {
                courseCode,
                curriculumCode,
                subjectCode,
                name,
                type,
            });

            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Discipline not found.") {
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
