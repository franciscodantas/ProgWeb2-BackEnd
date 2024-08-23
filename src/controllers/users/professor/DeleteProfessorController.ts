    import { Request, Response } from 'express'; 
    import { DeleteProfessorService } from '../../../services/user/professor/DeleteProfessorService';

    export class DeleteProfessorController {
        async handle(request: Request, response: Response) {
            const { id } = request.params;

            try {
                const deleteProfessorService = new DeleteProfessorService();
                const result = await deleteProfessorService.deleteProfessor(parseInt(id));

                return response.status(204).send();
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Professor not found.") {
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
