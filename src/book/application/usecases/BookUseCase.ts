import { Book } from "../../domain/entities/Book";
import { BookRepository } from "../../infrastructure/repositories/BookRepository";

export class BookUseCase {
    constructor(private bookRepository: BookRepository) { }

    async createBook(book: Book): Promise<Book> {
        const createdBook = await this.bookRepository.createBook(book);
        return createdBook;
    }

    async getAllBooks(): Promise<Book[]> {
        const allBooks = await this.bookRepository.getAllBooks();
        return allBooks;
    }

    async getBookById(bookId: string): Promise<Book | null> {
        const book = await this.bookRepository.getBookById(bookId);
        return book;
    }

    async getInactiveBooks(): Promise<Book[]> {
        const inactiveBooks = await this.bookRepository.getInactiveBooks();
        return inactiveBooks;
    }

    async getBooksWithReviews(): Promise<Book[]> {
        const booksWithReviews = await this.bookRepository.getBooksWithReviews();
        return booksWithReviews;
    }

    async updateBookById(bookId: string, userId: string, updatedBook: Book): Promise<Book | null> {
        const book = await this.bookRepository.getBookById(bookId);

        if (!book) {
            return null;
        }

        if (book.idUser !== userId) {
            return null; // El libro no pertenece al usuario que intenta actualizarlo
        }

        const updated = await this.bookRepository.updateBookById(bookId, updatedBook);

        if (!updated) {
            return null;
        }

        return updated;
    }

    async deleteBookById(bookId: string): Promise<void> {
        await this.bookRepository.deleteBookById(bookId);
    }

    async filterBooks(title: string | undefined, author: string | undefined, code: string | undefined): Promise<Book[]> {
        const filteredBooks = await this.bookRepository.filterBooks(title, author, code);
        return filteredBooks;
    }

    async updateBookStatus(bookId: string, userId: string, status: boolean): Promise<Book | null> {
        const updatedBook = await this.bookRepository.updateBookStatus(bookId, userId, status);
        return updatedBook;
    }

    async borrowBook(bookId: string): Promise<void> {
        const book = await this.bookRepository.getBookById(bookId);
        console.log(book?.loan_status)
        if (book) {
            throw new Error('El usuario ya tiene un libro prestrado, devuelva el actual primero.');
        }
        await this.bookRepository.borrowBook(bookId);
    }

    async returnBook(bookId: string): Promise<void> {
        const book = await this.bookRepository.getBookById(bookId);
        if (!book || !book.loan_status) {
            throw new Error('El usuario no tiene un libro prestado para devolver.');
        }
        await this.bookRepository.returnBook(bookId);
    }

}