import { EditUserUseCase } from '../../application/usecases/editUserUseCase';
import UserModel from '../models/userModel';
import {Request, Response} from "express";
import UserFieldValidator from '../../domain/validator/userValidator';

export class EditUserController {
    constructor(private editUserUseCase: EditUserUseCase) {}
  
    async updateUser(req: Request, res: Response): Promise<void> {
      const idUser  = parseInt(req.params.idUser);
      const updatedUser = req.body as unknown as UserModel;

  
      try {
        UserFieldValidator.validateName(req, res, () => {
          UserFieldValidator.validateLastName(req, res, () => {
            UserFieldValidator.validateEmail(req, res, async () => {
              UserFieldValidator.validatePassword(req, res, async () => {
                const user = await this.editUserUseCase.updateUser(Number(idUser), updatedUser);
                if (user) {
                  res.status(200).json(user);
                } else {
                  res.status(404).json({ error: 'Usuario no encontrado.' });
                }
              });
            });
          });
        });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario.' });
      }
    }
}