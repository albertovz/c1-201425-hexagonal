import { BookRepository } from "../domain/bookRepository";
import { BookModel } from "../infraestructure/models/bookModel";

export class EditBookUseCase {
    constructor(private bookRepository: BookRepository) {}
  
    async updateBook(idBook: number, updatedBook: BookModel): Promise<BookModel | null> {
      return this.bookRepository.updateBook(idBook, updatedBook);
    }
  }