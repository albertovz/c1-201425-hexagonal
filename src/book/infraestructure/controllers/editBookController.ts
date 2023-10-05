import { EditBookUseCase } from '../../application/editBookUseCase';
import { BookModel } from '../models/bookModel';
import { Request, Response } from 'express';
import BookValidator from '../../domain/validator/bookValidator';

export class EditBookController {
    constructor(private editBookUseCase: EditBookUseCase) {}

    async updateBook(req: Request, res: Response): Promise<void> {
        const idBook = parseInt(req.params.idBook);
        const updatedBook = req.body as unknown as BookModel;

        try {
            BookValidator.validateTitle(req, res, () => {
                BookValidator.validateFolio(req, res, () => {
                    BookValidator.validateAuthor(req, res, () => {
                        BookValidator.validateEditionNumber(req, res, () => {
                            BookValidator.validateDescription(req, res, async () => {
                                const book = await this.editBookUseCase.updateBook(Number(idBook), updatedBook);

                                if (book) {
                                    res.status(200).json(book);
                                } else {
                                    res.status(404).json({ error: 'Libro no encontrado.' });
                                }
                            });
                        });
                    });
                });
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el libro.' });
        }
    }
}
