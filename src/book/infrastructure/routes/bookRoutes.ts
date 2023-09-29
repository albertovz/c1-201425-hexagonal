import express, { Router, Request, Response } from 'express';
import { BookUseCase } from '../../application/usecases/BookUseCase';
import { BookRepository } from '../repositories/BookRepository';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

const bookRepository = new BookRepository();
const bookUseCase = new BookUseCase(bookRepository);

declare global {
    namespace Express {
        interface Request {
            userId: string; // Define el tipo de userId como string
        }
    }
}

const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, 'alberto', (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Token no válido' });
        }
        req.userId = decoded.userId;
        next();
    });
};

router.post('/create', async (req, res) => {
    try {
        const book = req.body;
        const createdBook = await bookUseCase.createBook(book);
        res.status(201).json('Libro creado con éxito.');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/books', async (req, res) => {
    try {
        const books = await bookUseCase.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/books/:id', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookUseCase.getBookById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/search', verifyToken, async (req, res) => {
    try {
        const { title, author, code } = req.query;
        const filteredBooks = await bookUseCase.filterBooks(title as string, author as string, code as string);

        if (filteredBooks.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros coincidentes' });
        }

        res.status(200).json(filteredBooks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/list/inactive', verifyToken, async (req, res) => {
    try {
        const inactiveBooks = await bookUseCase.getInactiveBooks();

        if (inactiveBooks.length === 0) {
            return res.status(404).json({ message: 'No se encontraron libros inactivos' });
        }

        res.status(200).json(inactiveBooks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/with-reviews', async (req, res) => {
    try {
        const booksWithReviews = await bookUseCase.getBooksWithReviews();
        res.status(200).json(booksWithReviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateBook/:id', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.userId;
        const book = req.body;

        const updatedBook = await bookUseCase.updateBookById(bookId, userId, book);

        if (!updatedBook) {
            return res.status(404).json({ error: 'Solo el propietario de este libro puede actualizarlo.' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/borrow-book/:id', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        await bookUseCase.borrowBook(bookId);
        res.status(200).json({ message: 'Libro prestado con éxito.' });
    } catch (error) {
        res.status(400).json({ message: 'El usuario ya tiene un libro, devuelva primero antes de solicitar otro.' });
    }
});

router.put('/return-book/:id', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        await bookUseCase.returnBook(bookId);
        res.status(200).json({ message: 'Libro devuelto con éxito.' });
    } catch (error) {
        res.status(400).json({ message: 'El usuario no tiene un libro prestado' });
    }
});

router.put('/update/:id/status', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.userId; // Obtener el ID del usuario del token
        const status = req.body.status; // Nuevo estado del libro (true o false)

        const updatedBook = await bookUseCase.updateBookStatus(bookId, userId, status);
        console.log(status)
        if (!updatedBook) {
            return res.status(404).json({ error: 'Libro no encontrado o no tienes permisos' });
        }

        res.status(200).json('Estado del libro actualizado con éxito');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteBook/:id', verifyToken, async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.userId;

        // Verifica si el libro pertenece al usuario antes de eliminarlo
        const book = await bookUseCase.getBookById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        if (book.idUser !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este libro' });
        }

        // Elimina el libro si pertenece al usuario
        await bookUseCase.deleteBookById(bookId);

        res.status(200).json({ message: 'Libro eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;