import { AddReviewUseCase } from "../application/addReviewUseCase";
import { InactiveReviewUseCase } from "../application/inactiveReviewUseCase";
import { ReviewModel } from "./models/reviewModel";
import { AddReviewController } from "./controllers/addReviewController";
import { InactivateReviewController } from "./controllers/inactiveReviewController";
import { MysqlOrmReviewRepository } from "./mysqlOrmReviewRepository";
import { ViewReviewInactiveUseCase } from "../application/viewReviewInactiveUseCase";
import { ViewReviewInactiveController } from "./controllers/viewReviewInactiveController";
import { ViewReviewController } from "./controllers/viewReviewController";
import { ViewReviewUseCase } from "../application/viewReviewUseCase";
import { ViewReviewByIdUseCase } from "../application/viewReviewByIdUseCase";
import { ViewReviewByIdController } from "./controllers/viewReviewByIdController";
import { FilterReviewUseCase } from "../application/filterReviewUseCase";
import { FilterReviewController } from "./controllers/filterReviewController";
import { EditReviewUseCase } from "../application/editReviewUseCase";
import { EditReviewController } from "./controllers/editReviewController";
import { DeleteReviewUseCase } from "../application/deleteUserUseCase";
import { DeleteReviewController } from "./controllers/deleteUserController";

export const reviewModel = new ReviewModel();
export const mysqlOrmReviewRepository= new MysqlOrmReviewRepository(ReviewModel);
export const addReviewUseCase= new AddReviewUseCase(mysqlOrmReviewRepository);
export const addReviewController= new AddReviewController (addReviewUseCase); 

export const viewReviewUseCase = new ViewReviewUseCase(mysqlOrmReviewRepository);
export const viewReviewController = new ViewReviewController(viewReviewUseCase);

export const viewReviewByIdUseCase = new ViewReviewByIdUseCase(mysqlOrmReviewRepository);
export const viewReviewByIdController = new ViewReviewByIdController(viewReviewByIdUseCase);

export const viewReviewInactiveUseCase = new ViewReviewInactiveUseCase(mysqlOrmReviewRepository);
export const viewReviewInactiveController = new ViewReviewInactiveController(viewReviewInactiveUseCase);

export const filterReviewUseCase = new FilterReviewUseCase(mysqlOrmReviewRepository);
export const filterReviewController = new FilterReviewController(filterReviewUseCase);

export const editReviewUseCase = new EditReviewUseCase(mysqlOrmReviewRepository);
export const editReviewController = new EditReviewController(editReviewUseCase);

export const deleteReviewUseCase = new DeleteReviewUseCase(mysqlOrmReviewRepository);
export const deleteReviewController = new DeleteReviewController(deleteReviewUseCase);

export const inactiveReviewUseCase = new InactiveReviewUseCase(mysqlOrmReviewRepository);
export const inactivateReviewController = new InactivateReviewController(inactiveReviewUseCase);


