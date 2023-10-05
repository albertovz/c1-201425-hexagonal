import { ReviewModel } from '../infrastructure/models/reviewModel';
import { ReviewRepository } from '../domain/reviewRepository';

export class AddReviewUseCase{
  constructor(private reviewRepository: ReviewRepository) {}

  async createReview(comment: string, status: boolean, idUser: number, idBook: number): Promise<ReviewModel | null> {
    return this.reviewRepository.createReview(comment, status, idUser, idBook);
  }
}

