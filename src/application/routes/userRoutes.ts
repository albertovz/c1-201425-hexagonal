// src/application/routes/userRoutes.ts
import express, { Router } from 'express';
import { UserUseCase } from '../usecases/UserUseCase';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

const router: Router = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

router.post('/create', async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userUseCase.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define otras rutas y controladores para usuarios

export default router;
