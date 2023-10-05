import { Request, Response } from 'express';
import { ViewBookInactiveUseCase } from '../../application/viewBookInactiveUseCase';

export class ViewBookInactiveController {
    constructor(private viewBookInactiveUseCase: ViewBookInactiveUseCase) {}
  
    async getInactiveBook(req: Request, res: Response): Promise<void> {
        try {
          const inactiveBooks = await this.viewBookInactiveUseCase.getInactiveBook();
          res.json(inactiveBooks);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener libros inactivos.' });
        }
      }
      
}