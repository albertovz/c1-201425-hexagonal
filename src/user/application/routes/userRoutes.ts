// src/application/routes/userRoutes.ts
import express, { Router } from 'express';
import { UserUseCase } from '../usescases/UserUseCase';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

router.post('/api/create', async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userUseCase.createUser(user);
    res.status(201).json('Usuario creado con éxito.');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario por su correo electrónico
    const user = await userUseCase.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Correo electrónico incorrecto o inexistente' });
    }

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Genera un token JWT
    const token = jwt.sign({ userId: user.id }, 'alberto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
