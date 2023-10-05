import { Request, Response } from 'express';
import { FilterReviewUseCase } from '../../application/filterReviewUseCase';

export class FilterReviewController {
  constructor(private filterReviewUseCase: FilterReviewUseCase) {}

  async filterReviewByUser(req: Request, res: Response): Promise<void> {
    try {
      const { idUser} = req.query;
      const filteredUsers = await this.filterReviewUseCase.filterReviewByUser(Number(idUser));
      res.json(filteredUsers);
    } catch (error) {
      res.status(500).json({ error: 'Error al filtrar reseña.' });
    }
  }
}
