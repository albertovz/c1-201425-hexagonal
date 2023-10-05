import { ReviewModel } from "../infrastructure/models/reviewModel";
import { ReviewRepository } from "../domain/reviewRepository";

export class EditReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) {}
  
    async updateReview(idReview: number, comment: string, status: boolean, idUser: number, idBook: number): Promise<ReviewModel | null> {
        return this.reviewRepository.updateReview(idReview, comment, status, idUser, idBook);
    }

}