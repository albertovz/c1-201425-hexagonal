import { Request, Response } from 'express';
import { InactiveUserUseCase } from '../../application/usecases/inactiveUserUseCase';

export class InactivateUserController {
  constructor(private inactiveUserUseCase: InactiveUserUseCase) {}

  async inactivateUser(req: Request, res: Response): Promise<void> {
    try {
      const { idUser } = req.params;
      const userId = parseInt(idUser, 10);

      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'ID de usuario no válido' });
        return;
      }

      const success = await this.inactiveUserUseCase.inactiveUser(userId);

      if (success) {
        res.json({ message: 'Usuario inactivado con éxito' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al inactivar usuario:', error);
      res.status(500).json({ error: 'Error al inactivar usuario' });
    }
  }
}
