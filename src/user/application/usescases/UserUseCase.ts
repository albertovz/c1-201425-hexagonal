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
    return this.userRepository.getUserByEmail(email);
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUsersByFilter(name: string, email: string): Promise<User[]> {
    return this.userRepository.getUsersByFilter(name, email);
  }

  async updateUserById(userId: string, userData: Partial<User>): Promise<User | null> {
    return this.userRepository.updateUserById(userId, userData);
  }

  async updateUserPassword(userId: string, newPassword: string): Promise<User | null> {
    return this.userRepository.updateUserPassword(userId, newPassword);
  }

  async updateUserStatus(userId: string, newStatus: boolean): Promise<User | null> {
    return this.userRepository.updateUserStatus(userId, newStatus);
  }

  async updateUserLoanStatus(userId: string, loanStatus: boolean): Promise<User | null> {
    return this.userRepository.updateLoanStatus(userId, loanStatus);
  }

  async returnBook(userId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user || !user.loan_status) {
      throw new Error('El usuario no tiene un libro prestado para devolver.');
    }
    await this.userRepository.returnBook(userId);
  }

  async listInactiveUsers(): Promise<User[]> {
    return this.userRepository.listInactiveUsers();
  }

  async logoutUserById(userId: string): Promise<void> {
    return Promise.resolve();
  }

  async deleteUserById(userId: string): Promise<User | null> {
    return this.userRepository.deleteUserById(userId);
  }
}
