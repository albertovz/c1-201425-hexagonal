import { Request, Response } from 'express';
import { ListBooksUseCase } from '../../application/viewBookWithReviewsUseCase';

export class ViewBookListController {
  constructor(private listBooksUseCase: ListBooksUseCase) {}

  async listBooks(req: Request, res: Response): Promise<void> {
    try {
      const booksWithReviews = await this.listBooksUseCase.listBooks();

      if (!booksWithReviews) {
        res.status(500).json({ error: 'Error al obtener libros con reseñas.' });
        return;
      }
      res.status(200).json(booksWithReviews);
    } catch (error) {
      console.error('Error al obtener libros con reseñas:', error);
      res.status(500).json({ error: 'Error en el servidor.' });
    }
  }
}
