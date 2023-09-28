"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const mysql_1 = __importDefault(require("mysql"));
const uuid_1 = require("uuid");
// import { dbConfig } from '../database/db.config';
// dotenv.config({ path: __dirname + './environments/.env'});
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE, 
// });
// Configura la conexión a la base de datos MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion',
};
const connection = mysql_1.default.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
    else {
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
    }
    else {
        console.log('Tabla "books" creada exitosamente o ya existe.');
    }
    // Cerrar la conexión a la base de datos
    // connection.end();
});
class BookRepository {
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = (0, uuid_1.v4)(); // Genera un UUID único
                const query = 'INSERT INTO books (id, title, author, description, year, img_url, status, code, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [id, book.title, book.author, book.description, book.year, book.img_url, book.status, book.code, book.idUser];
                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error al crear el libro:', err);
                        reject(err);
                    }
                    else {
                        console.log('Libro creado con éxito');
                        resolve(book);
                    }
                });
            });
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM books';
                connection.query(query, (err, results) => {
                    if (err) {
                        console.error('Error al obtener los libros:', err);
                        reject(err);
                    }
                    else {
                        console.log('Libros obtenidos con éxito');
                        const books = results.map((row) => ({
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
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM books WHERE id = ?';
                connection.query(query, [bookId], (err, results) => {
                    if (err) {
                        console.error('Error al obtener el libro por ID:', err);
                        reject(err);
                    }
                    else {
                        if (results.length === 0) {
                            resolve(null); // El libro no fue encontrado
                        }
                        else {
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
        });
    }
    getInactiveBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM books WHERE status = ?';
                connection.query(query, [false], (err, results) => {
                    if (err) {
                        console.error('Error al obtener los libros inactivos:', err);
                        reject(err);
                    }
                    else {
                        const inactiveBooks = results.map((row) => ({
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
        });
    }
    getBooksWithReviews() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    }
                    else {
                        const booksWithReviews = results.map((row) => ({
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
        });
    }
    filterBooks(title, author, code) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    }
                    else {
                        const books = results.map((row) => ({
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
        });
    }
    updateBookById(bookId, updatedBook) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'UPDATE books SET title = ?, author = ?, description = ?, year = ?, img_url = ?, status = ?, code = ? WHERE id = ?';
                const values = [updatedBook.title, updatedBook.author, updatedBook.description, updatedBook.year, updatedBook.img_url, updatedBook.status, updatedBook.code, bookId];
                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error al actualizar el libro por ID:', err);
                        reject(err);
                    }
                    else {
                        if (result.affectedRows === 0) {
                            resolve(null); // El libro no fue actualizado (puede que no exista)
                        }
                        else {
                            resolve(updatedBook);
                        }
                    }
                });
            });
        });
    }
    updateBookStatus(bookId, userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Primero, verifica si el usuario tiene permisos para actualizar el estado del libro
                const checkPermissionQuery = 'SELECT * FROM books WHERE id = ? AND idUser = ?';
                connection.query(checkPermissionQuery, [bookId, userId], (err, results) => {
                    if (err) {
                        console.error('Error al verificar permisos:', err);
                        reject(err);
                    }
                    else {
                        if (results.length === 0) {
                            resolve(null); // El libro no fue encontrado o el usuario no tiene permisos
                        }
                        else {
                            // El usuario tiene permisos, procede a actualizar el estado del libro
                            const updateQuery = 'UPDATE books SET status = ? WHERE id = ?';
                            connection.query(updateQuery, [status, bookId], (err, updateResult) => {
                                if (err) {
                                    console.error('Error al actualizar el estado del libro:', err);
                                    reject(err);
                                }
                                else {
                                    console.log('Estado del libro actualizado con éxito');
                                    resolve(Object.assign(Object.assign({}, results[0]), { status })); // Devuelve el libro actualizado
                                }
                            });
                        }
                    }
                });
            });
        });
    }
    deleteBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'DELETE FROM books WHERE id = ?';
                connection.query(query, [bookId], (err) => {
                    if (err) {
                        console.error('Error al eliminar el libro por ID:', err);
                        reject(err);
                    }
                    else {
                        console.log('Libro eliminado con éxito');
                        resolve();
                    }
                });
            });
        });
    }
}
exports.BookRepository = BookRepository;
