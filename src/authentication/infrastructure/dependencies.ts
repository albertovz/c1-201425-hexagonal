import { AuthUseCase } from "../application/usecase/authUseCase";
import { AuthController } from "./controllers/authController";
import { MysqlOrmRepository } from "./repositories/mysqlORMRepository";

export const mysqlOrmRepository = new MysqlOrmRepository();

export const authUseCase = new AuthUseCase(mysqlOrmRepository);

export const authController = new AuthController(authUseCase);
