import { UserRepository } from "../../domain/repository/userRepository";

export class EditPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async updatePassword(idUser: number, newPassword: string): Promise<boolean> {
    const updated = await this.userRepository.updatePassword(idUser, newPassword);
    return updated;
  }
}
