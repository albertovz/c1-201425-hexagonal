import { UserRepository } from "../../domain/repository/userRepository";
import UserModel from "../../infrastructure/models/userModel";

export class AddUserUseCase{
    constructor(private userRepository: UserRepository) {}
  
    async createUser(user: UserModel): Promise<UserModel|null> {
      return this.userRepository.createUser(user);
    }
  }