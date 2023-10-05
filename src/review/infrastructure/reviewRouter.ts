// import { addUserController,  deleteUserController,  editPasswordController,  editUserController,  filterUsersController,  inactivateUserController,  viewUserByIdController,  viewUserController, viewUserInactiveController } from './dependencies'; 
import express from 'express';
import { addReviewController, deleteReviewController, editReviewController, filterReviewController, inactivateReviewController, viewReviewByIdController, viewReviewController, viewReviewInactiveController } from './dependencies';
import authenticateMiddleware from '../../middlewares/authentication';


export const reviewRouter = express.Router();

reviewRouter.post("/",  authenticateMiddleware,
addReviewController.createReview.bind(addReviewController));

reviewRouter.get("/", authenticateMiddleware,
viewReviewController.getAllReview.bind(viewReviewController));

reviewRouter.get("/:idReview", authenticateMiddleware,
viewReviewByIdController.getReviewById.bind(viewReviewByIdController));

reviewRouter.get("/inactive/status", authenticateMiddleware,
viewReviewInactiveController.getInactiveReview.bind(viewReviewInactiveController));

reviewRouter.get("/filter/users",authenticateMiddleware,
filterReviewController.filterReviewByUser.bind(filterReviewController));

reviewRouter.put('/:idReview/users/:idUser', authenticateMiddleware,
editReviewController.updateReview.bind(editReviewController));

reviewRouter.delete('/:idReview/user/:idUser',authenticateMiddleware, 
deleteReviewController.deleteReview.bind(deleteReviewController));

reviewRouter.put("/:idReview/inactivate", authenticateMiddleware,
inactivateReviewController.inactiveReview.bind(inactivateReviewController));
