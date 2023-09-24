// src/infrastructure/repositories/UserRepository.ts
import mysql from 'mysql';
import { User } from '../../domain/entities/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
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
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      status BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
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
            const id = uuidv4(); // Genera un UUID único
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    console.error('Error al crear el usuario:', err);
                    reject(err);
                } else {
                    const query = 'INSERT INTO users (id, name, last_name, email, password, status) VALUES (?, ?, ?, ?, ?, ?)';
                    const values = [id, user.name, user.last_name, user.email, hash, user.status];

                    connection.query(query, values, (err, result) => {
                        if (err) {
                            console.error('Error al crear el usuario:', err);
                            reject(err);
                        } else {
                            console.log('Usuario creado con éxito');
                            resolve(user);
                        }
                    });
                }
            });
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            connection.query(query, [email], (err, rows) => {
                if (err) {
                    console.error('Error al buscar el usuario por correo electrónico:', err);
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        resolve(null); // No se encontró un usuario con ese correo electrónico
                    } else {
                        const user = rows[0];
                        resolve({
                            id: user.id,
                            name: user.name,
                            last_name: user.last_name,
                            email: user.email,
                            password: user.password,
                            status: user.status,
                        });
                    }
                }
            });
        });
    }
}

