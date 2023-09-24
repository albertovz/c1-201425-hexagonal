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

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async getAllUsers(): Promise<User[]> {
    // Implementa la lógica para obtener todos los usuarios aquí
    return this.userRepository.getAllUsers();
  }

  async getUsersByFilter(name: string, email: string): Promise<User[]> {
    // Implementa la lógica para obtener usuarios por nombre o correo aquí
    return this.userRepository.getUsersByFilter(name, email);
  }

  async updateUserById(userId: string, userData: Partial<User>): Promise<User | null> {
    // Implementa la lógica para actualizar un usuario por ID aquí
    return this.userRepository.updateUserById(userId, userData);
  }

  async updateUserPassword(userId: string, newPassword: string): Promise<User | null> {
    // Implementa la lógica para actualizar la contraseña de un usuario por ID aquí
    return this.userRepository.updateUserPassword(userId, newPassword);
  }

  async updateUserStatus(userId: string, newStatus: boolean): Promise<User | null> {
    // Implementa la lógica para actualizar el estado de un usuario por ID aquí
    return this.userRepository.updateUserStatus(userId, newStatus);
  }

  async listInactiveUsers(): Promise<User[]> {
    // Implementa la lógica para listar todos los usuarios con status igual a false
    return this.userRepository.listInactiveUsers();
  }

  async deleteUserById(userId: string): Promise<User | null> {
    // Implementa la lógica para eliminar un usuario por ID aquí
    return this.userRepository.deleteUserById(userId);
  }

  // Implementa otros métodos relacionados con usuarios
}
