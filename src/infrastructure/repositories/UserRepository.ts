// src/infrastructure/repositories/UserRepository.ts
import mysql from 'mysql';
import { User } from '../../domain/entities/User';

// Configura la conexión a la base de datos MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion',
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
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

connection.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Error al crear la tabla:', error);
    } else {
        console.log('Tabla "users" creada exitosamente o ya existe.');
    }

    // Cerrar la conexión a la base de datos
    // connection.end();
});

export class UserRepository {
    async createUser(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
            const values = [user.id, user.username, user.email, user.password];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al crear el usuario:', err);
                    reject(err);
                } else {
                    console.log('Usuario creado con éxito');
                    resolve(user);
                }
            });
        });
    }

    // Implementa otros métodos como findById, findByEmail, etc.
}
