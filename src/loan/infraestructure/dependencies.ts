import { AddLoanUseCase } from "../application/addLoanUseCase";
import { LoanModel } from "../domain/models/loanModel";
import { AddLoanController } from "./controller/addLoanController";
import { MysqlOrmLoanRepository } from "./mysqlOrmReviewRepository";

export const loanModel = new LoanModel();
export const mysqlOrmLoanRepository= new MysqlOrmLoanRepository(LoanModel);
export const addLoanUseCase= new AddLoanUseCase(mysqlOrmLoanRepository);
export const addLoanController= new AddLoanController (addLoanUseCase); 

// export const viewReviewUseCase = new ViewReviewUseCase(mysqlOrmReviewRepository);
// export const viewReviewController = new ViewReviewController(viewReviewUseCase);

// export const viewReviewByIdUseCase = new ViewReviewByIdUseCase(mysqlOrmReviewRepository);
// export const viewReviewByIdController = new ViewReviewByIdController(viewReviewByIdUseCase);

// export const viewReviewInactiveUseCase = new ViewReviewInactiveUseCase(mysqlOrmReviewRepository);
// export const viewReviewInactiveController = new ViewReviewInactiveController(viewReviewInactiveUseCase);

// export const filterReviewUseCase = new FilterReviewUseCase(mysqlOrmReviewRepository);
// export const filterReviewController = new FilterReviewController(filterReviewUseCase);

// export const editReviewUseCase = new EditReviewUseCase(mysqlOrmReviewRepository);
// export const editReviewController = new EditReviewController(editReviewUseCase);

// export const deleteReviewUseCase = new DeleteReviewUseCase(mysqlOrmReviewRepository);
// export const deleteReviewController = new DeleteReviewController(deleteReviewUseCase);

// export const inactiveReviewUseCase = new InactiveReviewUseCase(mysqlOrmReviewRepository);
// export const inactivateReviewController = new InactivateReviewController(inactiveReviewUseCase);


