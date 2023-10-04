import { AuthEntity } from "../entities/Auth";

export interface authRepository {

    verifyUser (credentials : AuthEntity) : Promise<AuthEntity> | null; 
    
}