import { BookRepository } from "../domain/bookRepository";

export class DeleteBookUseCase {
    constructor(private bookRepository: BookRepository) {}
  
    async deleteBook(idUser: number): Promise<boolean> {
      return this.bookRepository.deleteBook(idUser);
    }
}
  