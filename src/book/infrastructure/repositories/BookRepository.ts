import mysql from 'mysql';
import { Book } from '../../domain/entities/Book';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id CHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      img_url VARCHAR(255) NOT NULL,
      status BOOLEAN NOT NULL,
      code VARCHAR(255) NOT NULL,
      idUser CHAR(36) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    )
  `;

connection.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Error al crear la tabla:', error);
    } else {
        console.log('Tabla "books" creada exitosamente o ya existe.');
    }

    // Cerrar la conexión a la base de datos
    // connection.end();
});

export class BookRepository {

    async createBook(book: Book): Promise<Book> {
        return new Promise((resolve, reject) => {
            const id = uuidv4(); // Genera un UUID único
            const query = 'INSERT INTO books (id, title, author, description, year, img_url, status, code, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [id, book.title, book.author, book.description, book.year, book.img_url, book.status, book.code, book.idUser];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al crear el libro:', err);
                    reject(err);
                } else {
                    console.log('Libro creado con éxito');
                    resolve(book);
                }
            });
        });
    }

    async getAllBooks(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM books';

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error al obtener los libros:', err);
                    reject(err);
                } else {
                    console.log('Libros obtenidos con éxito');
                    const books = results.map((row: any) => ({
                        id: row.id,
                        title: row.title,
                        author: row.author,
                        description: row.description,
                        year: row.year,
                        img_url: row.img_url,
                        status: row.status,
                        code: row.code,
                        idUser: row.idUser,
                    }));
                    resolve(books);
                }
            });
        });
    }

    async getBookById(bookId: string): Promise<Book | null> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM books WHERE id = ?';

            connection.query(query, [bookId], (err, results) => {
                if (err) {
                    console.error('Error al obtener el libro por ID:', err);
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // El libro no fue encontrado
                    } else {
                        const row = results[0];
                        const book = {
                            id: row.id,
                            title: row.title,
                            author: row.author,
                            description: row.description,
                            year: row.year,
                            img_url: row.img_url,
                            status: row.status,
                            code: row.code,
                            idUser: row.idUser,
                        };
                        resolve(book);
                    }
                }
            });
        });
    }

    async getInactiveBooks(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM books WHERE status = ?';

            connection.query(query, [false], (err, results) => {
                if (err) {
                    console.error('Error al obtener los libros inactivos:', err);
                    reject(err);
                } else {
                    const inactiveBooks = results.map((row: any) => ({
                        id: row.id,
                        title: row.title,
                        author: row.author,
                        description: row.description,
                        year: row.year,
                        img_url: row.img_url,
                        status: row.status,
                        code: row.code,
                        idUser: row.idUser,
                    }));
                    resolve(inactiveBooks);
                }
            });
        });
    }

    async getBooksWithReviews(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            const query = `
      SELECT books.*, reviews.* 
      FROM books 
      LEFT JOIN reviews ON books.id = reviews.idBook
      WHERE books.description IS NOT NULL
    `;

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error al obtener los libros con reseñas:', err);
                    reject(err);
                } else {
                    const booksWithReviews = results.map((row: any) => ({
                        id: row.id,
                        title: row.title,
                        author: row.author,
                        description: row.description,
                        year: row.year,
                        img_url: row.img_url,
                        status: row.status,
                        code: row.code,
                        idUser: row.idUser,
                        // Puedes mapear aquí los datos de las reseñas si es necesario
                    }));
                    resolve(booksWithReviews);
                }
            });
        });
    }

    async filterBooks(title: string | undefined, author: string | undefined, code: string | undefined): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM books WHERE 1=1'; // Comienza con una consulta básica

            const values = [];

            if (title) {
                query += ' AND title LIKE ?';
                values.push(`%${title}%`);
            }

            if (author) {
                query += ' AND author LIKE ?';
                values.push(`%${author}%`);
            }

            if (code) {
                query += ' AND code LIKE ?';
                values.push(`%${code}%`);
            }

            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error al filtrar libros:', err);
                    reject(err);
                } else {
                    const books = results.map((row: any) => ({
                        id: row.id,
                        title: row.title,
                        author: row.author,
                        description: row.description,
                        year: row.year,
                        img_url: row.img_url,
                        status: row.status,
                        code: row.code,
                        idUser: row.idUser,
                    }));
                    resolve(books);
                }
            });
        });
    }

    async updateBookById(bookId: string, updatedBook: Book): Promise<Book | null> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE books SET title = ?, author = ?, description = ?, year = ?, img_url = ?, status = ?, code = ? WHERE id = ?';
            const values = [updatedBook.title, updatedBook.author, updatedBook.description, updatedBook.year, updatedBook.img_url, updatedBook.status, updatedBook.code, bookId];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al actualizar el libro por ID:', err);
                    reject(err);
                } else {
                    if (result.affectedRows === 0) {
                        resolve(null); // El libro no fue actualizado (puede que no exista)
                    } else {
                        resolve(updatedBook);
                    }
                }
            });
        });
    }

    async updateBookStatus(bookId: string, userId: string, status: boolean): Promise<Book | null> {
        return new Promise((resolve, reject) => {
            // Primero, verifica si el usuario tiene permisos para actualizar el estado del libro
            const checkPermissionQuery = 'SELECT * FROM books WHERE id = ? AND idUser = ?';

            connection.query(checkPermissionQuery, [bookId, userId], (err, results) => {
                if (err) {
                    console.error('Error al verificar permisos:', err);
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // El libro no fue encontrado o el usuario no tiene permisos
                    } else {
                        // El usuario tiene permisos, procede a actualizar el estado del libro
                        const updateQuery = 'UPDATE books SET status = ? WHERE id = ?';
                        connection.query(updateQuery, [status, bookId], (err, updateResult) => {
                            if (err) {
                                console.error('Error al actualizar el estado del libro:', err);
                                reject(err);
                            } else {
                                console.log('Estado del libro actualizado con éxito');
                                resolve({ ...results[0], status }); // Devuelve el libro actualizado
                            }
                        });
                    }
                }
            });
        });
    }

    async deleteBookById(bookId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM books WHERE id = ?';

            connection.query(query, [bookId], (err) => {
                if (err) {
                    console.error('Error al eliminar el libro por ID:', err);
                    reject(err);
                } else {
                    console.log('Libro eliminado con éxito');
                    resolve();
                }
            });
        });
    }



}