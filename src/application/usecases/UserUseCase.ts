// src/application/use-cases/UserUseCase.ts
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    // Realiza la lógica de negocio, como validaciones, antes de crear al usuario
    // Por ejemplo, verifica si el correo electrónico ya está registrado

    // Llama al repositorio para crear al usuario
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  // Implementa otros métodos relacionados con usuarios
}
