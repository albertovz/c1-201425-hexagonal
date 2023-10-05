import UserModel from "../../infrastructure/models/userModel";
import { UserRepository } from '../../domain/repository/userRepository';

export class ViewUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async getUserById(userId: number): Promise<UserModel | null> {
      return this.userRepository.getUserById(userId);
    }
}