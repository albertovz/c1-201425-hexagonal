import { Request, Response } from 'express';
import { InactiveReviewUseCase } from '../../application/inactiveReviewUseCase';

export class InactivateReviewController {
  constructor(private inactiveReviewUseCase: InactiveReviewUseCase) {}

  async inactiveReview(req: Request, res: Response): Promise<void> {
    try {
      const { idReview } = req.params;
      const reviewId = parseInt(idReview, 10);

      if (! reviewId|| isNaN(reviewId)) {
        res.status(400).json({ error: 'ID de reseña no válido' });
        return;
      }

      const success = await this.inactiveReviewUseCase.inactiveReview(reviewId);

      if (success) {
        res.json({ message: 'Reseña inactivado con éxito' });
      } else {
        res.status(404).json({ error: 'Reseña no encontrado' });
      }
    } catch (error) {
      console.error('Error al inactivar reseña:', error);
      res.status(500).json({ error: 'Error al inactivar reseña' });
    }
  }
}
