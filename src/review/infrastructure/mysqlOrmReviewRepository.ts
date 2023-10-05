import { ReviewModel } from "./models/reviewModel";

import { ReviewRepository } from "../domain/reviewRepository";


export class MysqlOrmReviewRepository implements ReviewRepository {
  constructor(private readonly reviewModel: typeof ReviewModel) {}

  async getAllReview(): Promise<ReviewModel[]> {
    try {
      const reviews = await this.reviewModel.findAll();
      return reviews;
    } catch (error) {
      console.error("Error al obtener todas las reseñas:", error);
      return [];
    }
  }

  async getReviewById(reviewId: number): Promise<ReviewModel | null> {
    try {
      const review = await this.reviewModel.findByPk(reviewId);
      return review;
    } catch (error) {
      console.error(`Error al obtener reseña con ID ${reviewId}:`, error);
      return null;
    }
  }

  async getInactiveReview(): Promise<ReviewModel[] | null> {
    try {
      const inactiveBooks = await this.reviewModel.findAll({
        where: {
          status: false,
        },
      });
      return inactiveBooks;
    } catch (error) {
      console.error("Error al obtener reseñas inactivoas:", error);
      return [];
    }
  }

  async createReview(comment: string, status: boolean, idUser: number, idBook: number): Promise<ReviewModel | null> {
    try {
      const newReview = await this.reviewModel.create({
        comment,
        status,
        idUser,
        idBook,
        idReview: 0,  
      });
      return newReview;
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      throw error;
    }
  }


  async filterReviewByUser(idUser: number): Promise<ReviewModel[] | null> {
    try {
      const filteredReviews = await this.reviewModel.findAll({
        where: {
          idUser,
        },
      });
      return filteredReviews;
    } catch (error) {
      console.error('Error al filtrar reseña por usuario:', error);
      return null;
    }
  }

  async updateReview(idReview: number,comment: string,status: boolean, idUser: number, idBook: number): Promise<ReviewModel | null> {
    try {
      const review = await this.reviewModel.findByPk(idReview);

      if (!review) {
        return null; 
      }
      if (review.idUser !== idUser) {
        return null; 
      }
      const updatedReview = await review.update({
        comment: comment,
        status: status,
        idBook: idBook,
      });
      
      return updatedReview;
    } catch (error) {
      console.error('Error al actualizar la reseña:', error);
      return null;
    }
  }

  async deleteReview(idReview: number, idUser: number): Promise<boolean> {
    try {
      const review = await this.reviewModel.findByPk(idReview);

      if (!review) {
        return false;
      }
      if (review.idUser !== idUser) {
        return false; 
      }
      await review.destroy();

      return true;
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
      return false; 
    }
  }

  async inactiveReview(idReview: number): Promise<boolean> {
    try {
      const review = await this.reviewModel.findByPk(idReview);

      if (!review) {
        return false; 
      }
      await review.update({ status: false });
      return true; 
    } catch (error) {
      console.error(`Error al inactivar reseña con ID ${idReview}:`, error);
      return false;
    }
  }
}