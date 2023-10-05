import { Request, Response } from 'express';
import { ViewReviewUseCase } from '../../application/viewReviewUseCase';

export class ViewReviewController {
  constructor(private viewReviewUseCase: ViewReviewUseCase) {}

  async getAllReview(req: Request, res: Response): Promise<void> {
    const users = await this.viewReviewUseCase.getAllReview();
    res.json(users);
  }
}




