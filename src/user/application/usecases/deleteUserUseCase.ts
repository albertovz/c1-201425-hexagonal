import { UserRepository } from "../../domain/repository/userRepository";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}
  
    async deleteUserById(idUser: number): Promise<boolean> {
      return this.userRepository.deleteUser(idUser);
    }
}
  