import mysql from 'mysql';
import { Review } from '../../domain/entities/Review';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
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
    CREATE TABLE IF NOT EXISTS reviews (
      id CHAR(36) PRIMARY KEY,
      idBook VARCHAR(255) NOT NULL,
      idUser VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      stars VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    )
  `;

connection.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Error al crear la tabla:', error);
    } else {
        console.log('Tabla "reviews" creada exitosamente o ya existe.');
    }
});

export class ReviewRepository {

    async createReview(review: Review): Promise<Review> {
        return new Promise((resolve, reject) => {
            const id = uuidv4(); // Genera un UUID único
            const query = 'INSERT INTO reviews (id, idBook, idUser, description, stars, status) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [id, review.idBook, review.idUser, review.description, review.stars, review.status];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al crear la reseña:', err);
                    reject(err);
                } else {
                    console.log('Reseña creada con éxito');
                    resolve(review);
                }
            });
        });
    }

    async getAllReviews(): Promise<Review[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews';

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error al obtener las reseñas:', err);
                    reject(err);
                } else {
                    const reviews: Review[] = results.map((row: any) => ({
                        id: row.id,
                        idBook: row.idBook,
                        idUser: row.idUser,
                        description: row.description,
                        stars: row.stars,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        deleted_at: row.deleted_at,
                    }));
                    resolve(reviews);
                }
            });
        });
    }

    async getReviewById(id: string): Promise<Review | null> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews WHERE id = ?';

            connection.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error al obtener la reseña por ID:', err);
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // No se encontró ninguna reseña con el ID especificado
                    } else {
                        const row = results[0];
                        const review: Review = {
                            id: row.id,
                            idBook: row.idBook,
                            idUser: row.idUser,
                            description: row.description,
                            stars: row.stars,
                            status: row.status,
                        };
                        resolve(review);
                    }
                }
            });
        });
    }

    async getReviewsWithStatus(): Promise<Review[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews WHERE status = ?';

            connection.query(query, [false], (err, results) => {
                if (err) {
                    console.error('Error al obtener las reseñas con estado false:', err);
                    reject(err);
                } else {
                    const reviews: Review[] = results.map((row: any) => ({
                        id: row.id,
                        idBook: row.idBook,
                        idUser: row.idUser,
                        description: row.description,
                        stars: row.stars,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        deleted_at: row.deleted_at,
                    }));
                    resolve(reviews);
                }
            });
        });
    }

    async filterReviewsByUserId(userId: string): Promise<Review[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews WHERE idUser = ?';
            
            connection.query(query, [userId], (err, results) => {
                if (err) {
                    console.error('Error al filtrar las reseñas por ID de usuario:', err);
                    reject(err);
                } else {
                    const filteredReviews: Review[] = results.map((row: any) => ({
                        id: row.id,
                        idBook: row.idBook,
                        idUser: row.idUser,
                        description: row.description,
                        stars: row.stars,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                        deleted_at: row.deleted_at,
                    }));
                    resolve(filteredReviews);
                }
            });
        });
    }

    async changeReviewStatus(id: string, newStatus: string): Promise<Review | null> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE reviews SET status = ? WHERE id = ?';

            connection.query(query, [newStatus, id], (err, result) => {
                if (err) {
                    console.error('Error al cambiar el estado de la reseña por ID:', err);
                    reject(err);
                } else {
                    if (result.affectedRows === 0) {
                        resolve(null); // No se encontró ninguna reseña con el ID especificado
                    } else {
                        const updatedReview = { ...result, status: newStatus } as Review;
                        resolve(updatedReview);
                    }
                }
            });
        });
    }

    async updateReview(id: string, updatedReviewData: Partial<Review>): Promise<Review | null> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE reviews SET ? WHERE id = ?';

            connection.query(query, [updatedReviewData, id], (err, result) => {
                if (err) {
                    console.error('Error al actualizar la reseña por ID:', err);
                    reject(err);
                } else {
                    if (result.affectedRows === 0) {
                        resolve(null); // No se encontró ninguna reseña con el ID especificado
                    } else {
                        const updatedReview = { id, ...updatedReviewData } as Review;
                        resolve(updatedReview);
                    }
                }
            });
        });
    }

    async deleteReview(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM reviews WHERE id = ?';

            connection.query(query, [id], (err) => {
                if (err) {
                    console.error('Error al eliminar la reseña por ID:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}