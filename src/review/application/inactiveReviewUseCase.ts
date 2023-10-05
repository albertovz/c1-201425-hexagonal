import { ReviewRepository } from "../domain/reviewRepository";

export class InactiveReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) {}
  
    async inactiveReview(idReview: number): Promise<boolean> {
      return this.reviewRepository.inactiveReview(idReview);
    }
}