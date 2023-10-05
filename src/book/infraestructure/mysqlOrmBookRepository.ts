import { ReviewModel } from "../../review/infrastructure/models/reviewModel";
import { BookRepository } from "../domain/bookRepository";
import { BookModel } from "./models/bookModel";

export class MysqlOrmBookRepository implements BookRepository {
    constructor(private readonly bookModel: typeof BookModel, private readonly reviewModel: typeof ReviewModel) {}
  
    async getAllBook(): Promise<BookModel[]> {
      try {
        const books = await this.bookModel.findAll();
        return books;
      } catch (error) {
        console.error("Error al obtener todos los libros:", error);
        return [];
      }
    }
  
    async getBookById(bookId: number): Promise<BookModel | null> {
        try {
          const book = await this.bookModel.findByPk(bookId);
          return book;
        } catch (error) {
          console.error(`Error al obtener el libro con ID ${bookId}:`, error);
          return null;
        }
      }
  
    async getInactiveBook(): Promise<BookModel[] | null> {
      try {
        const inactiveBooks = await this.bookModel.findAll({
          where: {
            status: false,
          },
        });
        return inactiveBooks;
      } catch (error) {
        console.error("Error al obtener libros inactivos:", error);
        return [];
      }
    }


    async createBook(book: BookModel): Promise<BookModel> {
      try {
        const newBook = await this.bookModel.create(book);
        return newBook;
      } catch (error) {
        console.error("Error al crear el libro:", error);
        throw error;
      }
    }

    async getAllBooksWithReviews(): Promise<BookModel[]> {
      try {
        // Consulta todos los libros con sus reseñas asociadas utilizando el alias 'reviews'
        const booksWithReviews = await this.bookModel.findAll({
          include: [{ model: this.reviewModel, as: 'reviews' }], // Especifica el alias 'reviews' aquí
        });
    
        return booksWithReviews;
      } catch (error) {
        console.error('Error al obtener todos los libros con reseñas:', error);
        return [];
      }
    }
  
    async filterUsersByTitleAndFolioAndAuthor(title: string, author: string, folio:string): Promise<BookModel[] | null> {
      try {
        const filteredBooks = await this.bookModel.findAll({
          where: {
            title,
            author,
            folio
          },
        });
        return filteredBooks;
      } catch (error) {
        console.error('Error al filtrar libro por titulo, author y folio:', error);
        return null;
      }
    }
  
    async filterBooksByTitle(title: string): Promise<BookModel[] | null> {
      try {
        const filteredBooks = await this.bookModel.findAll({
          where: {
            title,
          },
        });
        return filteredBooks;
      } catch (error) {
        console.error('Error al filtrar libro por titulo:', error);
        return null;
      }
    }
  
    async filterBooksByAuthor(author: string): Promise<BookModel[] | null> {
      try {
        const filteredBooks = await this.bookModel.findAll({
          where: {
            author,
          },
        });
        return filteredBooks;
      } catch (error) {
        console.error('Error al filtrar libro por autor:', error);
        return null;
      }
    }

    async filterBooksByFolio(folio: string): Promise<BookModel[] | null> {
        try {
          const filteredBooks = await this.bookModel.findAll({
            where: {
              folio,
            },
          });
          return filteredBooks;
        } catch (error) {
          console.error('Error al filtrar libro por folio:', error);
          return null;
        }
      }
  
    async updateBook(idBook: number, updatedBook: BookModel): Promise<BookModel | null> {
      try {
        const [affectedRows] = await this.bookModel.update(updatedBook, {
          where: { idBook },
        });
        if (affectedRows === 0) {
          return null;
        }
        const updatedUserData = await this.bookModel.findByPk(idBook);
        return updatedUserData;
      } catch (error) {
        console.error(`Error al actualizar el libro con ID ${idBook}:`, error);
        return null;
      }
    }
  
    async deleteBook(idBook: number): Promise<boolean> {
      try {
        const book = await this.bookModel.findByPk(idBook);
  
        if (!book) {
          return false; 
        }
        await book.destroy();
        return true; 
      } catch (error) {
        console.error(`Error al eliminar el libro con ID ${idBook}:`, error);
        return false; 
      }
    }
  
    async inactiveBook(idBook: number): Promise<boolean> {
      try {
        const book = await this.bookModel.findByPk(idBook);
  
        if (!book) {
          return false; 
        }
        await book.update({ status: false });
        return true; 
      } catch (error) {
        console.error(`Error al inactivar libro con ID ${idBook}:`, error);
        return false;
      }
    }

    async activateBook(idBook: number): Promise<boolean> {
        try {
          const book = await this.bookModel.findByPk(idBook);
    
          if (!book) {
            return true; 
          }
          await book.update({ status: true });
          return true; 
        } catch (error) {
          console.error(`Error al activar libro con ID ${idBook}:`, error);
          return false;
        }
      }
  }