import { Request, Response } from 'express';
import { ViewReviewInactiveUseCase } from '../../application/viewReviewInactiveUseCase';

export class ViewReviewInactiveController {
    constructor(private viewReviewInactiveUseCase: ViewReviewInactiveUseCase) {}
  
    async getInactiveReview(req: Request, res: Response): Promise<void> {
        try {
          const inactiveUsers = await this.viewReviewInactiveUseCase.getInactiveReview();
          res.json(inactiveUsers);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener reseñas inactivas.' });
        }
      }
      
}