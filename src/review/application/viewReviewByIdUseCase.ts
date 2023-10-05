import { ReviewModel } from '../infrastructure/models/reviewModel';
import { ReviewRepository } from '../domain/reviewRepository';

export class ViewReviewByIdUseCase {
    constructor(private reviewRepository: ReviewRepository) {}

    async getReviewById(reviewId: number): Promise<ReviewModel | null> {
      return this.reviewRepository.getReviewById(reviewId);
    }
}