import { ReviewRepository } from '../domain/reviewRepository';

export class DeleteReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) {}
  
    async deleteReview(idReview: number, idUser: number): Promise<boolean> {
      return this.reviewRepository.deleteReview(idReview,idUser);
    }
}
  