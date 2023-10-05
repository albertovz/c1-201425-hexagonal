import { ReviewModel } from "../infrastructure/models/reviewModel";
import { ReviewRepository } from "../domain/reviewRepository";

export class ViewReviewUseCase{
  constructor(private reviewRepository: ReviewRepository) {}

  async getAllReview(): Promise<ReviewModel[] | null> {
    return this.reviewRepository.getAllReview();
  }
}
