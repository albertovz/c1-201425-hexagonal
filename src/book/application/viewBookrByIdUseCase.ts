import { BookRepository } from '../domain/bookRepository';
import { BookModel } from '../infraestructure/models/bookModel';

export class ViewBookByIdUseCase {
    constructor(private bookRepository: BookRepository) {}

    async getBookById(bookId: number): Promise<BookModel | null> {
      return this.bookRepository.getBookById(bookId);
    }
}