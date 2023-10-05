import { LoanRepository } from "../domain/loanRepository";
import { LoanModel } from "../domain/models/loanModel";

export class AddLoanUseCase{
  constructor(private loanRepository: LoanRepository) {}

  async createLoan(deliverDate: string, loanDate:string, status: boolean, idUser: number, idBook: number): Promise<LoanModel | null> {
    return this.loanRepository.createLoan(deliverDate, loanDate, status,idUser, idBook);
  }
}

