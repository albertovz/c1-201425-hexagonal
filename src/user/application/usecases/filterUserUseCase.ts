import UserModel from "../../infrastructure/models/userModel";
import { UserRepository } from "../../domain/repository/userRepository";

export class FilterUsersUseCase {
    constructor(private userRepository: UserRepository) {}
      
    async filterUsersByNameAndEmail(name: string, email: string): Promise<UserModel[] | null> {
      return this.userRepository.filterUsersByNameAndEmail(name, email);
    }

    async filterUsersByName(name: string): Promise<UserModel[] | null> {
        return this.userRepository.filterUsersByName(name);
    }

    async filterUsersByEmail(email: string): Promise<UserModel[] | null> {
        return this.userRepository.filterUsersByEmail(email);
    }

  }
  