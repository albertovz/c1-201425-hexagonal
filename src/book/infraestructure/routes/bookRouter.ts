import express from 'express';
import { activateBookController, addBookController, deleteBookController, editBookController, filterBookController, inactivateBookController, viewBookByIdController, viewBookController, viewBookInactiveController, viewBookListController} from '../dependencies';
import authenticateMiddleware from '../../../middlewares/authentication';

export const bookRouter = express.Router();

bookRouter.post("/", authenticateMiddleware,
addBookController.createBook.bind(addBookController));

bookRouter.get("/", authenticateMiddleware,
viewBookController.getAllBook.bind(viewBookController));

bookRouter.get("/:idBook", authenticateMiddleware,
viewBookByIdController.getBookById.bind(viewBookByIdController));

bookRouter.get("/inactive/status", authenticateMiddleware,
viewBookInactiveController.getInactiveBook.bind(viewBookInactiveController));

bookRouter.get("/filter/TitleOrAuthorOrFolio",authenticateMiddleware,
filterBookController.filterBooksByTitleAndFolioAndAuthor.bind(filterBookController));

bookRouter.put('/:idBook', authenticateMiddleware,
editBookController.updateBook.bind(editBookController));

bookRouter.delete('/:idBook', authenticateMiddleware,
deleteBookController.deleteBook.bind(deleteBookController));

bookRouter.put("/:idBook/inactivate", authenticateMiddleware,
inactivateBookController.inactiveBook.bind(inactivateBookController));

bookRouter.put("/:idBook/activate", authenticateMiddleware,
activateBookController.activateBook.bind(activateBookController));

bookRouter.get("/books/reviews", authenticateMiddleware,
viewBookListController.listBooks.bind(viewBookListController));