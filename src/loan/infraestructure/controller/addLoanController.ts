import { Request, Response } from 'express';
import { AddLoanUseCase } from '../../application/addLoanUseCase';



export class AddLoanController {
  constructor(private addLoanUseCase: AddLoanUseCase) {}

  async createLoan(req: Request, res: Response) {
    try {
      const { deliverDate, loanDate, status,idUser, idBook } = req.body;
      const newPost = await this.addLoanUseCase.createLoan(deliverDate, loanDate, status,idUser, idBook);
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}




