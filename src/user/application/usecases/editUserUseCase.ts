import { UserRepository } from "../../domain/repository/userRepository";
import UserModel from "../../infrastructure/models/userModel";

export class EditUserUseCase {
    constructor(private userRepository: UserRepository) {}
  
    async updateUser(idUser: number, updatedUser: UserModel): Promise<UserModel | null> {
      return this.userRepository.updateUser(idUser, updatedUser);
    }
  }