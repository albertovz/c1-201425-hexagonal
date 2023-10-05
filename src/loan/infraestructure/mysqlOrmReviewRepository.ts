import { LoanRepository } from "../domain/loanRepository";
import { LoanModel } from "../domain/models/loanModel";

export class MysqlOrmLoanRepository implements LoanRepository {
  constructor(private readonly loanModel: typeof LoanModel) {}

  async createLoan(deliverDate: string, loanDate:string, status: boolean, idUser: number, idBook: number): Promise<LoanModel | null> {
    try {
      const newReview = await this.loanModel.create({
        deliverDate,
        loanDate,
        status,
        idUser,
        idBook,
        idLoan: 0,  
      });
      return newReview;
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      throw error;
    }
  }

}