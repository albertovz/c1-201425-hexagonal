import { Loan } from "../../domain/entities/Loan";
import { LoanRepository } from "../../infrastructure/repositories/LoanRepository";

export class LoanUseCase {
    constructor(private loanRepository: LoanRepository) { }

    async createLoan(loan: Loan): Promise<Loan> {
        const createdLoan = await this.loanRepository.createLoan(loan);
        return createdLoan;
      }
}