import {Request, Response} from "express";
import { ViewUserByIdUseCase } from "../../application/usecases/viewUserByIdUseCase";

export class ViewUserByIdController{
    constructor(private viewUserByIdUseCase: ViewUserByIdUseCase) {}

    async getUserById(req: Request, res: Response): Promise<void> {
      const userId = parseInt(req.params.idUser);
      if (isNaN(userId)) {
        res.status(400).json({ message: 'ID de usuario no válido' });
        return;
      }
  
      const user = await this.viewUserByIdUseCase.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    }
}