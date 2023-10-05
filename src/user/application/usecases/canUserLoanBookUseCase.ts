import { UserRepository } from "../../domain/repository/userRepository";

export class CanUserLoanBookUseCase{
    constructor(private userRepository: UserRepository) {}
  
    // async canUserLoanBook(idUser: number, idBook: number): Promise<string>{ 
    //   return this.userRepository.canUserLoanBook(idUser, idBook);
    // }
  }