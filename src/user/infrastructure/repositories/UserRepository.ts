// src/infrastructure/repositories/UserRepository.ts
import mysql from 'mysql';
import { User } from '../../domain/entities/User';
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

    async getUserById(userId: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            connection.query(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Error al buscar el usuario por ID:', err);
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        resolve(null); // No se encontró un usuario con ese ID
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

    async getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';

            connection.query(query, (err, rows) => {
                if (err) {
                    console.error('Error al obtener todos los usuarios:', err);
                    reject(err);
                } else {
                    const users: User[] = [];

                    for (const row of rows) {
                        users.push({
                            id: row.id,
                            name: row.name,
                            last_name: row.last_name,
                            email: row.email,
                            password: row.password,
                            status: row.status,
                        });
                    }

                    resolve(users);
                }
            });
        });
    }

    async updateUserById(userId: string, userData: Partial<User>): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const { name, last_name, email, password, status } = userData;
            const updateFields: string[] = [];
            const updateValues: string[] = [];
            //   const updateFields = [];
            //   const updateValues = [];

            if (name) {
                updateFields.push('name = ?');
                updateValues.push(name);
            }

            if (last_name) {
                updateFields.push('last_name = ?');
                updateValues.push(last_name);
            }

            if (email) {
                updateFields.push('email = ?');
                updateValues.push(email);
            }

            if (password) {
                // Hash de la nueva contraseña antes de actualizarla
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.error('Error al crear el usuario:', err);
                        reject(err);
                    } else {
                        updateFields.push('password = ?');
                        updateValues.push(hash);

                        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
                        const values = [...updateValues, userId];

                        connection.query(query, values, (err, result) => {
                            if (err) {
                                console.error('Error al actualizar el usuario:', err);
                                reject(err);
                            } else {
                                console.log('Usuario actualizado con éxito');
                                resolve(userData as User);
                            }
                        });
                    }
                });
            } else {
                const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
                const values = [...updateValues, userId];

                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error al actualizar el usuario:', err);
                        reject(err);
                    } else {
                        console.log('Usuario actualizado con éxito');
                        resolve(userData as User);
                    }
                });
            }
        });
    }

    async updateUserPassword(userId: string, newPassword: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            // Hash de la nueva contraseña antes de actualizarla
            bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) {
                    console.error('Error al crear el usuario:', err);
                    reject(err);
                } else {
                    const query = 'UPDATE users SET password = ? WHERE id = ?';
                    const values = [hash, userId];

                    connection.query(query, values, (err, result) => {
                        if (err) {
                            console.error('Error al actualizar la contraseña del usuario:', err);
                            reject(err);
                        } else {
                            console.log('Contraseña del usuario actualizada con éxito');
                            resolve({ id: userId, password: hash } as User);
                        }
                    });
                }
            });
        });
    }

    async updateUserStatus(userId: string, newStatus: boolean): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET status = ? WHERE id = ?';
            const values = [newStatus, userId];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error al actualizar el estado del usuario:', err);
                    reject(err);
                } else {
                    console.log('Estado del usuario actualizado con éxito');
                    resolve({ id: userId, status: newStatus } as User);
                }
            });
        });
    }

    async listInactiveUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE status = false';
            connection.query(query, (err, rows) => {
                if (err) {
                    console.error('Error al listar usuarios inactivos:', err);
                    reject(err);
                } else {
                    const inactiveUsers: User[] = [];

                    for (const row of rows) {
                        inactiveUsers.push({
                            id: row.id,
                            name: row.name,
                            last_name: row.last_name,
                            email: row.email,
                            password: row.password,
                            status: row.status,
                        });
                    }

                    resolve(inactiveUsers);
                }
            });
        });
    }

    async getUsersByFilter(name: string, email: string): Promise<User[]> {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM users WHERE 1';

            const values: any[] = [];

            if (name) {
                query += ' AND name LIKE ?';
                values.push(`%${name}%`);
            }

            if (email) {
                query += ' AND email LIKE ?';
                values.push(`%${email}%`);
            }

            connection.query(query, values, (err, rows) => {
                if (err) {
                    console.error('Error al buscar usuarios por filtro:', err);
                    reject(err);
                } else {
                    const users: User[] = rows.map((row: any) => ({
                        id: row.id,
                        name: row.name,
                        last_name: row.last_name,
                        email: row.email,
                        password: row.password,
                        status: row.status,
                    }));
                    resolve(users);
                }
            });
        });
    }

    async deleteUserById(userId: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            connection.query(query, [userId], (err, result) => {
                if (err) {
                    console.error('Error al eliminar el usuario:', err);
                    reject(err);
                } else {
                    if (result.affectedRows === 0) {
                        resolve(null); // No se encontró un usuario con ese ID
                    } else {
                        console.log('Usuario eliminado con éxito');
                        resolve({ id: userId } as User);
                    }
                }
            });
        });
    }

}

