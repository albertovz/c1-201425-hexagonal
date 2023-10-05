import { Request, Response } from 'express';
import { ActivateBookUseCase } from "../../application/activateBookUseCase";

export class ActivateBookController {
    constructor(private activateBookUseCase: ActivateBookUseCase) {}
  
    async activateBook(req: Request, res: Response): Promise<void> {
      try {
        const { idBook } = req.params;
        const bookId = parseInt(idBook, 10);
  
        if (!bookId || isNaN(bookId)) {
          res.status(400).json({ error: 'ID de libro no válido' });
          return;
        }
  
        const success = await this.activateBookUseCase.activateBook(bookId);
  
        if (success) {
          res.json({ message: 'Libro activado con éxito' });
        } else {
          res.status(404).json({ error: 'Libro no encontrado' });
        }
      } catch (error) {
        console.error('Error al inactivar libro:', error);
        res.status(500).json({ error: 'Error al inactivar libro' });
      }
    }
  }
  