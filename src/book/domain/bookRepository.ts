import { BookModel } from "../infraestructure/models/bookModel";

export interface BookRepository {
    getAllBook(): Promise<BookModel[] | null>;
    createBook(user: BookModel): Promise<BookModel|null>;
    getBookById(idBook: number): Promise<BookModel|null>;
    getInactiveBook(): Promise<BookModel[]| null>;
    filterUsersByTitleAndFolioAndAuthor(title: string, author: string, folio:string): Promise<BookModel[] | null>;
    filterBooksByTitle(title: string):  Promise<BookModel[] | null>;
    filterBooksByAuthor(author: string):  Promise<BookModel[] | null>;
    filterBooksByFolio(folio: string):  Promise<BookModel[] | null>;
    updateBook(idBook: number, updatedBook: BookModel): Promise<BookModel | null>;
    deleteBook(idBook: number): Promise<boolean>;
    inactiveBook(idBook: number): Promise<boolean>;
    activateBook(idBook: number): Promise<boolean>;
    getAllBooksWithReviews(): Promise<BookModel[] | null>;
}