import { BookRepository } from "../domain/bookRepository";

export class InactiveBookUseCase {
    constructor(private bookRepository: BookRepository) {}
  
    async inactiveBook(idBook: number): Promise<boolean> {
      return this.bookRepository.inactiveBook(idBook);
    }
}