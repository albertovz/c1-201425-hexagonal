import { Request, Response } from 'express';
import { FilterUsersUseCase } from '../../application/usecases/filterUserUseCase';

export class FilterUsersController {
  constructor(private filterUsersUseCase: FilterUsersUseCase) {}

  async filterUsersByNameAndEmail(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.query;
      if (!name && !email) {
        res.status(400).json({ error: 'Debes proporcionar al menos un dato de busqueda.' });
        return;
      }

      let filteredUsers;

      if (name && email) {
        filteredUsers = await this.filterUsersUseCase.filterUsersByNameAndEmail(
          String(name),
          String(email)
        );
      } else if (name) {
        filteredUsers = await this.filterUsersUseCase.filterUsersByName(String(name));
      } else if (email) {
        filteredUsers = await this.filterUsersUseCase.filterUsersByEmail(String(email));
      }
      if (!filteredUsers) {
        res.status(500).json({ error: 'Error al filtrar usuarios.' });
        return;
      }
      res.json(filteredUsers);
    } catch (error) {
      res.status(500).json({ error: 'Error al filtrar usuarios.' });
    }
  }
}
