import { Request, Response } from 'express';
import { AddReviewUseCase } from '../../application/addReviewUseCase';
import { ReviewModel } from '../models/reviewModel';


export class AddReviewController {
  constructor(private addReviewUseCase: AddReviewUseCase) {}

  async createReview(req: Request, res: Response) {
    try {
      const { comment, status, idUser, idBook } = req.body;
      const newPost = await this.addReviewUseCase.createReview(comment, status, idUser, idBook);
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}




