import { ReviewModel } from "../infrastructure/models/reviewModel";
import { ReviewRepository } from "../domain/reviewRepository";

export class FilterReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) {}
  
    async filterReviewByUser(idUser: number): Promise<ReviewModel[] | null> {
        return this.reviewRepository.filterReviewByUser(idUser);
    }

}
  