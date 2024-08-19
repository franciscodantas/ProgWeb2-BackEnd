import { Request, Response } from 'express';
import { DeleteAdmService } from '../../services/adm/DeleteAdmService';

export class DeleteAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const deleteService = new DeleteAdmService();
            const deletedAdm = await deleteService.delete(id);

            if (deletedAdm == null) {
                return response.status(404).json({ error: "Adm not found!" });
            } else if (deletedAdm instanceof Error) {
                return response.status(400).json({ error: "An error occurred while deleting the adm.", info: deletedAdm.message });
            }

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while deleting the adm.", details: error});
        }
    }
}
