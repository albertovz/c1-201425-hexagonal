import { AddBookUseCase } from '../application/addBookUseCase';
import { BookModel } from "./models/bookModel";
import { MysqlOrmBookRepository } from './mysqlOrmBookRepository';
import { AddBookController } from './controllers/addBookController';
import { ViewBookUseCase } from '../application/viewBookUseCase';
import { ViewBookController } from './controllers/viewBookController';
import { ViewBookByIdUseCase } from '../application/viewBookrByIdUseCase';
import { ViewBookByIdController } from './controllers/viewBookByIdController';
import { viewUserController } from '../../user/infrastructure/dependencies';
import { ViewBookInactiveUseCase } from '../application/viewBookInactiveUseCase';
import { ViewBookInactiveController } from './controllers/viewBookInactiveController';
import { FilterBooksUseCase } from '../application/filterBookUseCase';
import { FilterBookController } from './controllers/filterBookController';
import { EditBookUseCase } from '../application/editBookUseCase';
import { EditBookController } from './controllers/editBookController';
import { InactiveBookUseCase } from '../application/inactiveBookUseCase';
import { InactivateBookController } from './controllers/inactiveBookController';
import { ActivateBookUseCase } from '../application/activateBookUseCase';
import { ActivateBookController } from './controllers/activateBookController';
import { DeleteBookUseCase } from '../application/deleteBookUseCase';
import { DeleteBookController } from './controllers/deleteUserController';
import { ListBooksUseCase } from '../application/viewBookWithReviewsUseCase';
import { ViewBookListController } from './controllers/viewBookWhithReviewController';
import { ReviewModel } from '../../review/infrastructure/models/reviewModel';


export const bookModel = new BookModel();
export const reviewModel = new ReviewModel();
export const mysqlOrmBookRepository= new MysqlOrmBookRepository(BookModel, ReviewModel);
export const addBookUseCase= new AddBookUseCase(mysqlOrmBookRepository);
export const addBookController= new AddBookController (addBookUseCase);

export const viewBookUseCase = new ViewBookUseCase(mysqlOrmBookRepository);
export const viewBookController = new ViewBookController(viewBookUseCase);

export const viewBookByIdUseCase = new ViewBookByIdUseCase(mysqlOrmBookRepository);
export const viewBookByIdController = new ViewBookByIdController(viewBookByIdUseCase);

export const viewBookInactiveUseCase = new ViewBookInactiveUseCase(mysqlOrmBookRepository);
export const viewBookInactiveController = new ViewBookInactiveController(viewBookInactiveUseCase);

export const filterBooksUseCase = new FilterBooksUseCase(mysqlOrmBookRepository);
export const filterBookController = new FilterBookController(filterBooksUseCase);

export const editBookUseCase = new EditBookUseCase(mysqlOrmBookRepository);
export const editBookController = new EditBookController(editBookUseCase);

export const inactiveBookUseCase = new InactiveBookUseCase(mysqlOrmBookRepository);
export const inactivateBookController = new InactivateBookController(inactiveBookUseCase);

export const activateBookUseCase = new ActivateBookUseCase(mysqlOrmBookRepository);
export const activateBookController = new ActivateBookController(activateBookUseCase);

export const deleteBookUseCase = new DeleteBookUseCase(mysqlOrmBookRepository);
export const deleteBookController = new DeleteBookController(deleteBookUseCase);

export const listBooksUseCase = new ListBooksUseCase(mysqlOrmBookRepository);
export const viewBookListController = new ViewBookListController(listBooksUseCase);