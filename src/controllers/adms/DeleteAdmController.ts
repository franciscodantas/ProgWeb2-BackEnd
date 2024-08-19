import { Request, Response } from 'express';
import { DeleteAdmService } from '../../services/adm/DeleteAdmService';

export class DeleteAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const deleteService = new DeleteAdmService();
            const deletedAdm = await deleteService.delete(id);

            if (deletedAdm instanceof Error) {
                return response.status(404).json({ error: deletedAdm.message });
            }

            return response.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ error: "An unexpected error occurred.", info: error.message, stackTrace: error.stack });
            }
        }
    }
}
