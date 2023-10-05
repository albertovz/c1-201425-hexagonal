import { BookRepository } from '../domain/bookRepository';
import { BookModel } from '../infraestructure/models/bookModel';


export class ViewBookInactiveUseCase {
    constructor(private bookRepository: BookRepository) {}

    async getInactiveBook(): Promise<BookModel[] | null> {
    return this.bookRepository.getInactiveBook();
  }
}