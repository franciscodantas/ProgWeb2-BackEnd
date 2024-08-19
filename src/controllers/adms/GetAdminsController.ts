import { Request, Response } from 'express';
import { GetAdminsService } from '../../services/adm/GetAdminsService';

export class GetAdminsController {
    async handle(request: Request, response: Response) {
        try {
            const adminService = new GetAdminsService();
            const admins = await adminService.getAdmins();
            
            return response.status(200).json(admins);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ error: "An unexpected error occurred.", info: error.message, stackTrace: error.stack });
            }
        }
    }
}
