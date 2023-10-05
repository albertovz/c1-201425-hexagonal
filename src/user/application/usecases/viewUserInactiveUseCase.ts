import UserModel from "../../infrastructure/models/userModel";
import { UserRepository } from '../../domain/repository/userRepository';

export class ViewUserInactiveUseCase {
    constructor(private userRepository: UserRepository) {}

    async getInactiveUser(): Promise<UserModel[] | null> {
    return this.userRepository.getInactiveUser();
  }
}