// src/application/routes/userRoutes.ts
import express, { Router, Request, Response } from 'express';
import { UserUseCase } from '../../application/usescases/UserUseCase';
import { UserRepository } from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

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

router.post('/create', async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userUseCase.createUser(user);
    res.status(201).json('Usuario creado con éxito.');
  } catch (error) {
    res.status(500).json('El usuario ya existe.');
  }
});

router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica que el usuario que intenta ver la información sea el mismo que está autenticado
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para ver la información de este usuario' });
    }

    const user = await userUseCase.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users', verifyToken, async (req, res) => {
  try {
    // Verifica que el usuario tenga permisos para esta acción (puedes implementar lógica adicional aquí)
    // Si lo deseas, puedes verificar si el usuario que hace la solicitud tiene un rol específico o privilegios para ver todos los usuarios.

    const users = await userUseCase.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.query;

    // Llama a UserUseCase para obtener la lista de usuarios filtrados
    const filteredUsers = await userUseCase.getUsersByFilter(name as string, email as string);

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
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
    const token = jwt.sign({ userId: user.id }, 'alberto', { expiresIn: '10h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    // Verifica que el usuario que intenta actualizar sea el mismo que está autenticado
    if (userId !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar este usuario' });
    }

    const updatedUser = await userUseCase.updateUserById(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatePassword/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body;

    // Verifica que el usuario que intenta actualizar la contraseña sea el mismo que está autenticado
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar la contraseña de este usuario' });
    }

    // Verifica que la nueva contraseña no sea vacía
    if (!newPassword) {
      return res.status(400).json({ error: 'La nueva contraseña no puede estar vacía' });
    }

    const updatedUser = await userUseCase.updateUserPassword(userId, newPassword);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updateStatus/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { newStatus } = req.body;

    // Verifica que el usuario que intenta actualizar el estado sea el mismo que está autenticado
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar el estado de este usuario' });
    }

    // Verifica que el nuevo estado sea un valor booleano
    if (typeof newStatus !== 'boolean') {
      return res.status(400).json({ error: 'El nuevo estado debe ser un valor booleano' });
    }

    const updatedUser = await userUseCase.updateUserStatus(userId, newStatus);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Estado del usuario actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/requestLoan/:id', verifyToken, async (req, res) => {
  try {
      const userId = req.params.id;
      const { loanStatus } = req.body;

      // Verifica que el usuario que intenta actualizar el estado de préstamo sea el mismo que está autenticado
      if (userId !== req.userId) {
          return res.status(403).json({ error: 'No tienes permiso para actualizar el estado de préstamo de este usuario' });
      }

      // Verifica que el nuevo estado de préstamo sea un valor booleano
      if (typeof loanStatus !== 'boolean') {
          return res.status(400).json({ error: 'El nuevo estado de préstamo debe ser un valor booleano' });
      }

      const updatedUser = await userUseCase.updateUserLoanStatus(userId, loanStatus);

      if (!updatedUser) {
          return res.status(404).json({ message: 'Primero devuelve el libro prro' });
      }

      res.status(200).json({ message: 'Estado de préstamo del usuario actualizado con éxito' });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/return-book/:id', verifyToken, async (req, res) => {
  try {
      const userId = req.params.id;
      await userUseCase.returnBook(userId);
      res.status(200).json({ message: 'Libro devuelto con éxito.' });
  } catch (error) {
      res.status(400).json({ message: 'El usuario no tiene un libro prestado' });
  }
});

router.get('/getInactiveUsers', verifyToken, async (req, res) => {
  try {
    const inactiveUsers = await userUseCase.listInactiveUsers();

    res.status(200).json(inactiveUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica que el usuario que intenta cerrar sesión sea el mismo que está autenticado
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para cerrar sesión de este usuario' });
    }

    // Puedes implementar lógica adicional aquí, como invalidar el token si lo estás usando para sesiones

    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica que el usuario que intenta eliminar sea el mismo que está autenticado
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este usuario' });
    }

    const deletedUser = await userUseCase.deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
