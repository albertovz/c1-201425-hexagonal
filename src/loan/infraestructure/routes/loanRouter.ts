import express from 'express';
import { addLoanController } from '../dependencies';
import authenticateMiddleware from '../../../middlewares/authentication';


export const loanRouter = express.Router();

loanRouter.post("/",  authenticateMiddleware,
addLoanController.createLoan.bind(addLoanController));

// reviewRouter.get("/", 
// viewReviewController.getAllReview.bind(viewReviewController));

// reviewRouter.get("/:idReview", 
// viewReviewByIdController.getReviewById.bind(viewReviewByIdController));

// reviewRouter.get("/inactive/status", 
// viewReviewInactiveController.getInactiveReview.bind(viewReviewInactiveController));

// reviewRouter.get("/filter/users",
// filterReviewController.filterReviewByUser.bind(filterReviewController));

// reviewRouter.put('/:idReview/users/:idUser', 
// editReviewController.updateReview.bind(editReviewController));

// reviewRouter.delete('/:idReview/user/:idUser', 
// deleteReviewController.deleteReview.bind(deleteReviewController));

// reviewRouter.put("/:idReview/inactivate", 
// inactivateReviewController.inactiveReview.bind(inactivateReviewController));
