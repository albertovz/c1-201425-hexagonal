import {Request, Response} from "express";
import { ViewReviewByIdUseCase } from "../../application/viewReviewByIdUseCase";

export class ViewReviewByIdController{
    constructor(private viewReviewByIdUseCase: ViewReviewByIdUseCase) {}

    async getReviewById(req: Request, res: Response): Promise<void> {
      const reviewId = parseInt(req.params.idReview);
      if (isNaN(reviewId)) {
        res.status(400).json({ message: 'ID de reseña no válido' });
        return;
      }
  
      const user = await this.viewReviewByIdUseCase.getReviewById(reviewId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Reseña no encontrada' });
      }
    }
}