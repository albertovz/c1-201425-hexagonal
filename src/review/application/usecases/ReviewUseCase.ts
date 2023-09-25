import { Review } from "../../domain/entities/Review";
import { ReviewRepository } from "../../infrastructure/repositories/ReviewRepository";

export class ReviewUseCase {
    constructor(private reviewRepository: ReviewRepository) { }

    async createReview(review: Review): Promise<Review> {
        const createdReview = await this.reviewRepository.createReview(review);
        return createdReview;
    }

    async getAllReviews(): Promise<Review[]> {
        const reviews = await this.reviewRepository.getAllReviews();
        return reviews;
    }

    async getReviewById(id: string): Promise<Review | null> {
        const review = await this.reviewRepository.getReviewById(id);
        return review;
    }

    async getReviewsWithStatus(): Promise<Review[]> {
        const reviews = await this.reviewRepository.getReviewsWithStatus();
        return reviews;
    }

    async filterReviewsByUserId(userId: string): Promise<Review[]> {
        const filteredReviews = await this.reviewRepository.filterReviewsByUserId(userId);
        return filteredReviews;
    }

    async deleteReview(id: string): Promise<void> {
        await this.reviewRepository.deleteReview(id);
    }

    async updateReview(id: string, updatedReviewData: Partial<Review>): Promise<Review | null> {
        const updatedReview = await this.reviewRepository.updateReview(id, updatedReviewData);
        return updatedReview;
    }

    async changeReviewStatus(id: string, newStatus: string): Promise<Review | null> {
        const updatedReview = await this.reviewRepository.changeReviewStatus(id, newStatus);
        return updatedReview;
    }

}