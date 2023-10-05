import { BookRepository } from "../domain/bookRepository";

export class ActivateBookUseCase {
    constructor(private bookRepository: BookRepository) {}
  
    async activateBook(idBook: number): Promise<boolean> {
      return this.bookRepository.activateBook(idBook);
    }
}