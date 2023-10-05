import { AddBookUseCase } from '../../application/addBookUseCase';
import { BookModel } from '../models/bookModel';
import { Request, Response } from 'express';
import BookValidator from '../../domain/validator/bookValidator';

export class AddBookController {
  constructor(private addBookUseCase: AddBookUseCase) {}

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      BookValidator.validateTitle(req, res, () => {
        BookValidator.validateFolio(req, res, () => {
          BookValidator.validateAuthor(req, res, () => {
            BookValidator.validateEditionNumber(req, res, () => {
              BookValidator.validateDescription(req, res, async () => {
                const newBook = req.body as BookModel;
                const createdBook = await this.addBookUseCase.createBook(newBook);

                if (createdBook) {
                  res.status(201).json(createdBook);
                } else {
                  res.status(500).json({ error: 'Error al crear un libro.' });
                }
              });
            });
          });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor.' });
    }
  }
}
