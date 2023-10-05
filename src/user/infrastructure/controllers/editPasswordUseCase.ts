import { Request, Response } from 'express';
import { EditPasswordUseCase } from '../../application/usecases/editPasswordUseCase';

export class EditPasswordController {
  constructor(private editPasswordUseCase: EditPasswordUseCase) {}

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { idUser } = req.params;
      const { newPassword } = req.body;

      if (!idUser || !newPassword) {
        res.status(400).json({ error: 'Debes proporcionar el ID del usuario y la nueva contraseña.' });
        return;
      }

      const userId = parseInt(idUser, 10);
      const updated = await this.editPasswordUseCase.updatePassword(userId, newPassword);

      if (updated) {
        res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
      } else {
        res.status(500).json({ error: 'No se pudo actualizar la contraseña.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la contraseña.' });
    }
  }
}
