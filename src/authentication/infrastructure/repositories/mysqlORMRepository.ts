import { AuthEntity } from "../../domain/entities/Auth";
import { authRepository } from "../../domain/repositories/authRepository";

export class MysqlOrmRepository implements authRepository {

    verifyUser(credentials: AuthEntity): Promise<AuthEntity | null> {
        throw new Error ('Método no implementado');
    }

    logout() : Promise<boolean | null> {
        throw new Error ('Método no implementado');
    }

}