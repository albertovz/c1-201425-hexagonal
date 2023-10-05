import { AuthUseCase } from "../../application/usecase/authUseCase";
import { Request, Response } from "express";

export class AuthController {
    
    constructor (readonly useCase : AuthUseCase) {}

    async run (req : Request, res : Response) {

        try {
            
            let {email, password} = req.body;

            let auth = await this.useCase.run (
                email,
                password
            );

            res.status(200).json(auth);

        } catch (error) {
            
            return null;

        }

    }


}