import { ViewBookUseCase } from '../../application/viewBookUseCase';
import { Request, Response } from 'express';

export class ViewBookController {
    constructor(private viewBookUseCase: ViewBookUseCase) {}
  
    async getAllBook(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.viewBookUseCase.getAllBook();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener libros.' });
        }
    }
}
  