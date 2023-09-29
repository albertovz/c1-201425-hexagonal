// src/infrastructure/repositories/UserRepository.ts
import mysql from 'mysql';
import { Loan } from '../../domain/entities/Loan';
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
    CREATE TABLE IF NOT EXISTS loans (
      id CHAR(36) PRIMARY KEY,
      idUser VARCHAR(255) NOT NULL,
      idBook VARCHAR(255) NOT NULL,
      loan_status BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    )
  `;

connection.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Error al crear la tabla:', error);
    } else {
        console.log('Tabla "loans" creada exitosamente o ya existe.');
    }
});

export class LoanRepository {
    async createLoan(loan: Loan): Promise<Loan> {
        return new Promise((resolve, reject) => {
            const id = uuidv4(); // Genera un UUID único
            const query = 'INSERT INTO loans (id, idUser, idBook, loan_status) VALUES (?, ?, ?, ?)';
            const values = [id, loan.idUser, loan.idBook, loan.loan_status];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al crear el préstamo:', err);
                    reject(err);
                } else {
                    console.log('Prétamo creado con éxito');
                    resolve(loan);
                }
            });
        });
    }
}