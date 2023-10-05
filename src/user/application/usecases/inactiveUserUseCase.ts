import { UserRepository } from "../../domain/repository/userRepository";

export class InactiveUserUseCase {
    constructor(private userRepository: UserRepository) {}
  
    async inactiveUser(idUser: number): Promise<boolean> {
      return this.userRepository.inactiveUser(idUser);
    }
}