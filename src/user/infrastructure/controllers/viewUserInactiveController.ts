import { Request, Response } from 'express';
import { ViewUserInactiveUseCase } from "../../application/usecases/viewUserInactiveUseCase";

export class ViewUserInactiveController {
    constructor(private viewUserInactiveUseCase: ViewUserInactiveUseCase) {}
  
    async getInactiveUser(req: Request, res: Response): Promise<void> {
        try {
          const inactiveUsers = await this.viewUserInactiveUseCase.getInactiveUser();
          res.json(inactiveUsers);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener usuarios inactivos.' });
        }
      }
      
}