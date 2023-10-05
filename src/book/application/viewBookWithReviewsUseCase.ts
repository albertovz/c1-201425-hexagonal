import { BookRepository } from "../domain/bookRepository";
import { BookModel } from "../infraestructure/models/bookModel";

export class ListBooksUseCase {
    constructor(private readonly bookRepository: BookRepository) {}
  
    async listBooks(): Promise<BookModel[] | null> {
      try {
        const booksWithReviews = await this.bookRepository.getAllBooksWithReviews();
  
        if (!booksWithReviews) {
          throw new Error('No se pudieron obtener los libros con reseñas.');
        }
  
        return booksWithReviews;
      } catch (error) {
        console.error('Error al listar libros con reseñas:', error);
        return null;
      }
    }
  }

  
  
  
  