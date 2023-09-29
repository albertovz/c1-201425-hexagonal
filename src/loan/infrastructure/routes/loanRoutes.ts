import express, { Router, Request, Response } from 'express';
import { LoanUseCase } from '../../application/usescases/LoanUseCase';
import { LoanRepository } from '../repositories/LoanRepository';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

const loanRepository = new LoanRepository();
const loanUseCase = new LoanUseCase(loanRepository);

declare global {
  namespace Express {
    interface Request {
      userId: string; // Define el tipo de userId como string
    }
  }
}

const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, 'alberto', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }
    req.userId = decoded.userId;
    next();
  });
};

router.post('/new/loan/create', async (req, res) => {
    try {
      const loan = req.body;
      const createdLoan = await loanUseCase.createLoan(loan);
      res.status(201).json('Préstamo creado con éxito.');
    } catch (error) {
      res.status(500).json('Error al crear el préstamo');
    }
  });

export default router;