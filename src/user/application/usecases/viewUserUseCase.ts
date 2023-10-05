import UserModel from "../../infrastructure/models/userModel";
import { UserRepository } from '../../domain/repository/userRepository';

export class ViewUserUseCase{
  constructor(private userRepository: UserRepository) {}

  async getAllUser(): Promise<UserModel[] | null> {
    return this.userRepository.getAllUser();
  }
}
