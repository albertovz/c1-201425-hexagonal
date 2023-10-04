import { AuthEntity } from "../../domain/entities/Auth";
import { authRepository } from "../../domain/repositories/authRepository";
import { generateToken } from "../jwt/auth";

export class AuthUseCase {

    constructor (readonly repository : authRepository) {}

    async run (email : string, password : string) : Promise<any|null> {
        try {

            let credentials = new AuthEntity(email, password);

            let user = true;

            if (!user) {
                throw new Error('Credenciales inválidas');
            }

            let token = await generateToken(user);

            return {
                user,
                token
            }
            
        } catch (error) {
            return null;
        }
    }

}