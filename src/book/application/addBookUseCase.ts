import { BookRepository } from '../domain/bookRepository';
import { BookModel } from '../infraestructure/models/bookModel';

export class AddBookUseCase{
    constructor(private bookRepository: BookRepository) {}
  
    async createBook(book: BookModel): Promise<BookModel|null> {
      return this.bookRepository.createBook(book);
    }
  }