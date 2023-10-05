import { Request, Response } from 'express';
import { DeleteReviewUseCase} from '../../application/deleteUserUseCase';

export class DeleteReviewController {
  constructor(private deleteReviewUseCase: DeleteReviewUseCase) {}

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { idReview, idUser } = req.params; 
      const isDeleted = await this.deleteReviewUseCase.deleteReview(Number(idReview), Number(idUser));

      if (isDeleted) {
        res.status(200).json({ message: 'Reseña eliminada.' });
      } else {
        res.status(404).json({ error: 'Reseña no encontrada o no autorizada para eliminar.' });
      }
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
      res.status(500).json({ error: 'Error al eliminar la reseña.' });
    }
  }

}
