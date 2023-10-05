import {Request, Response} from "express";
import { ViewBookByIdUseCase} from '../../application/viewBookrByIdUseCase';

export class ViewBookByIdController{
    constructor(private viewBookByIdUseCase: ViewBookByIdUseCase) {}

    async getBookById(req: Request, res: Response): Promise<void> {
      const bookId = parseInt(req.params.idBook);
      if (isNaN(bookId)) {
        res.status(400).json({ message: 'ID de libro no válido' });
        return;
      }
  
      const book = await this.viewBookByIdUseCase.getBookById(bookId);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: 'Libro no encontrado' });
      }
    }
}