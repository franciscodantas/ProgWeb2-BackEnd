import { Request, Response } from 'express';
import { UpdateDisciplineService } from '../../services/discipline/UpdateDisciplineService';

export class UpdateDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { courseCode, curriculumCode, subjectCode, name, type } = request.body;

        try {
            const disciplineService = new UpdateDisciplineService();
            const result = await disciplineService.updateDiscipline(Number(id), {
                courseCode,
                curriculumCode,
                subjectCode,
                name,
                type,
            });

            if (result instanceof Error) {
                return response.status(404).json({ error: result.message });
            }

            return response.status(200).json(result);
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
