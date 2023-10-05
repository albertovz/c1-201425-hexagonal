import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../../application/usecases/deleteUserUseCase';

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { idUser } = req.params; 
      const isDeleted = await this.deleteUserUseCase.deleteUserById(Number(idUser));

      if (isDeleted) {
        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
  }
}
