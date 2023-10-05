import { ReviewModel } from "../infrastructure/models/reviewModel";
import { ReviewRepository } from "../domain/reviewRepository";


export class ViewReviewInactiveUseCase {
    constructor(private reviewRepository: ReviewRepository) {}

    async getInactiveReview(): Promise<ReviewModel[] | null> {
    return this.reviewRepository.getInactiveReview();
  }
}