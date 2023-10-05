import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import UserFieldValidator from '../../domain/validator/userValidator';
import { AddUserUseCase } from '../../application/usecases/addUserUseCase';

export class AddUserController {
  constructor(private addUserUseCase: AddUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      UserFieldValidator.validateName(req, res, () => {
        UserFieldValidator.validateLastName(req, res, () => {
          UserFieldValidator.validateEmail(req, res, async () => {
            UserFieldValidator.validatePassword(req, res, async () => {
              const newUser = req.body as UserModel;
              const createdUser = await this.addUserUseCase.createUser(newUser);

              if (createdUser) {
                res.status(201).json(createdUser);
              } else {
                res.status(500).json({ error: 'Error al crear el usuario.' });
              }
            });
          });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor.' });
    }
  }
}
