import { LoanModel } from "./models/loanModel";

export interface LoanRepository {
    createLoan(deliverDate: string, loanDate:string, status: boolean, idUser: number, idBook: number): Promise<LoanModel|null>;
}
