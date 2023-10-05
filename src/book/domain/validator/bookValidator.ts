import { Request, Response } from 'express';

class BookValidator {
  static validateTitle(req: Request, res: Response, next: any) {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'El campo "title" es obligatorio.' });
    }
    next();
  }

  static validateFolio(req: Request, res: Response, next: any) {
    const { folio } = req.body;
    if (!folio) {
      return res.status(400).json({ error: 'El campo "folio" es obligatorio.' });
    }
    next();
  }

  static validateAuthor(req: Request, res: Response, next: any) {
    const { author } = req.body;
    if (!author) {
      return res.status(400).json({ error: 'El campo "author" es obligatorio.' });
    }
    next();
  }

  static validateEditionNumber(req: Request, res: Response, next: any) {
    const { editionNumber } = req.body;
    if (!editionNumber) {
      return res.status(400).json({ error: 'El campo "editionNumber" es obligatorio.' });
    }
    next();
  }

  static validateDescription(req: Request, res: Response, next: any) {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'El campo "description" es obligatorio.' });
    }
    next();
  }
}

export default BookValidator;
