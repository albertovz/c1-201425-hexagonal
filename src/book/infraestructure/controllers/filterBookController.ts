import { Request, Response } from 'express';
import { FilterBooksUseCase } from '../../application/filterBookUseCase';

export class FilterBookController {
  constructor(private filterBooksUseCase: FilterBooksUseCase) {}

  async filterBooksByTitleAndFolioAndAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { title, author, folio } = req.query;
      if (!title && !author && !folio) {
        res.status(400).json({ error: 'Debes proporcionar al menos un dato de busqueda.' });
        return;
      }

      let filteredBooks;

      if (title && author && folio) {
        filteredBooks = await this.filterBooksUseCase.filterBooksByTitleAndFolioAndAuthor(
          String(title),
          String(author),
          String(folio)
        );
      } else if (title) {
        filteredBooks = await this.filterBooksUseCase.filterBooksByTitle(String(title));
      } else if (author) {
        filteredBooks = await this.filterBooksUseCase.filterBooksByAuthor(String(author));
      }else if (folio) {
        filteredBooks = await this.filterBooksUseCase.filterBooksByFolio(String(folio));
      }
      if (!filteredBooks) {
        res.status(500).json({ error: 'Error al filtrar libros.' });
        return;
      }
      res.json(filteredBooks);
    } catch (error) {
      res.status(500).json({ error: 'Error al filtrar libros.' });
    }
  }
}
