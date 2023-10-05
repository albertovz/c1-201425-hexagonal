import { Request, Response, NextFunction } from "express";
import UserModel from "../../infrastructure/models/userModel";

class UserFieldValidator {
    static validateName (req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'El campo "name" es obligatorio'});
        }

        next();
    }

    static validateLastName(req: Request, res: Response, next: NextFunction) {
        const { lastName } = req.body;

        if (!lastName) {
            return res.status(400).json({ error: 'El campo "lastName" es obligatorio.' });
        }

        next();
    }

    static async validateEmail(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'El campo "email" es obligatorio.' });
        }

        const existingUser = await UserModel.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        next();
    }

    static validatePassword(req: Request, res: Response, next: NextFunction) {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'El campo "password" es obligatorio.' });
        }

        next();
    } 
}

export default UserFieldValidator;