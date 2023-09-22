// src/domain/entities/User.ts
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string; // Debería ser un UUID
  username: string;
  email: string;
  password: string;
  // Otros campos y métodos relacionados con el usuario
}

export class UserEntity implements User {
  id: string;
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.id = uuidv4(); // Genera un nuevo UUID para cada instancia de usuario
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Otros métodos y propiedades de la entidad User
}
