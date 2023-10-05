import { BookRepository } from '../domain/bookRepository';
import { BookModel } from '../infraestructure/models/bookModel';

export class ViewBookUseCase{
    constructor(private bookRepository: BookRepository) {}
  
    async getAllBook(): Promise<BookModel[] | null> {
      return this.bookRepository.getAllBook();
    }
  }