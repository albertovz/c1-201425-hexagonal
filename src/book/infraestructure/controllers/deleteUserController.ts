import { Request, Response } from 'express';
import { DeleteBookUseCase } from '../../application/deleteBookUseCase';

export class DeleteBookController {
  constructor(private deleteBookUseCase: DeleteBookUseCase) {}

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const { idBook } = req.params; 
      const isDeleted = await this.deleteBookUseCase.deleteBook(Number(idBook));

      if (isDeleted) {
        res.status(200).json({ message: 'Libro eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Libro no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el libro.' });
    }
  }
}
