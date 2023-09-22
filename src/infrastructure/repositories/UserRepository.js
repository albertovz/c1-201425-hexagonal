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
exports.UserRepository = void 0;
// src/infrastructure/repositories/UserRepository.ts
const mysql_1 = __importDefault(require("mysql"));
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
    }
    else {
        console.log('Tabla "user" creada exitosamente o ya existe.');
    }
    // Cerrar la conexión a la base de datos
    // connection.end();
});
class UserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
                const values = [user.id, user.username, user.email, user.password];
                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error al crear el usuario:', err);
                        reject(err);
                    }
                    else {
                        console.log('Usuario creado con éxito');
                        resolve(user);
                    }
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
