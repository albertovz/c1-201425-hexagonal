import { BookRepository } from "../domain/bookRepository";
import { BookModel } from "../infraestructure/models/bookModel";


export class FilterBooksUseCase {
    constructor(private bookRepository: BookRepository) {}
      
    async filterBooksByTitleAndFolioAndAuthor(title: string, author: string, folio:string): Promise<BookModel[] | null> {
      return this.bookRepository.filterUsersByTitleAndFolioAndAuthor(title, author, folio);
    }

    async filterBooksByTitle(title: string): Promise<BookModel[] | null> {
        return this.bookRepository.filterBooksByTitle(title);
    }

    async filterBooksByAuthor(author: string): Promise<BookModel[] | null> {
      return this.bookRepository.filterBooksByAuthor(author);
  }

    async filterBooksByFolio(folio: string): Promise<BookModel[] | null> {
        return this.bookRepository.filterBooksByFolio(folio);
    }

  }
  