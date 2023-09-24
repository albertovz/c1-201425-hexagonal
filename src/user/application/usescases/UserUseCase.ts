// src/application/use-cases/UserUseCase.ts
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class UserUseCase {
  constructor(private userRepository: UserRepository) { }

  async createUser(user: User): Promise<User> {
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    // Implementa la búsqueda de usuario por correo aquí
    return this.userRepository.getUserByEmail(email);
  }

  // Implementa otros métodos relacionados con usuarios
}
