import { ReviewModel } from "../infrastructure/models/reviewModel";

export interface ReviewRepository {

    getAllReview(): Promise<ReviewModel[] | null>;
    createReview(comment: string, status: boolean, idUser: number, idBook: number): Promise<ReviewModel|null>;
    getReviewById(idReview: number): Promise<ReviewModel|null>;
    getInactiveReview(): Promise<ReviewModel[]| null>;
    updateReview(idReview: number, comment: string, status: boolean, idUser: number, idBook: number): Promise<ReviewModel | null>;
    deleteReview(idReview: number, idUser: number): Promise<boolean>;
    filterReviewByUser(idUser: number):  Promise<ReviewModel[] | null>;
    // filterUsersByEmail(email: string):  Promise<UserModel[] | null>;
    // updateUser(idUser: number, updatedUser: UserModel): Promise<UserModel | null>;
    // deleteUser(idUser: number): Promise<boolean>;
    // updatePassword(idUser: number, newPassword: string): Promise<boolean>;
    inactiveReview(idReview: number): Promise<boolean>;
}
