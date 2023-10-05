import { Request, Response } from 'express';
import { ViewUserUseCase } from '../../application/usecases/viewUserUseCase';

export class ViewUserController {
  constructor(private viewUserUseCase: ViewUserUseCase) {}

  async getAllUser(req: Request, res: Response): Promise<void> {
    const users = await this.viewUserUseCase.getAllUser();
    res.json(users);
  }
}




