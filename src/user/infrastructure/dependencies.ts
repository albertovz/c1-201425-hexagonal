import { AddUserUseCase } from "../application/usecases/addUserUseCase";
import { DeleteUserUseCase } from "../application/usecases/deleteUserUseCase";
import { EditPasswordUseCase } from "../application/usecases/editPasswordUseCase";
import { EditUserUseCase } from "../application/usecases/editUserUseCase";
import { FilterUsersUseCase } from "../application/usecases/filterUserUseCase";
import { InactiveUserUseCase } from "../application/usecases/inactiveUserUseCase";
import { ViewUserByIdUseCase } from "../application/usecases/viewUserByIdUseCase";
import { ViewUserInactiveUseCase } from "../application/usecases/viewUserInactiveUseCase";
import { ViewUserUseCase } from "../application/usecases/viewUserUseCase";
import { AddUserController } from "./controllers/addUserController";
import { DeleteUserController } from "./controllers/deleteUserController";
import { EditPasswordController } from "./controllers/editPasswordUseCase";
import { EditUserController } from "./controllers/editUserController";
import { FilterUsersController } from "./controllers/filterUserController";
import { InactivateUserController } from "./controllers/inactiveUserController";
import { ViewUserByIdController } from "./controllers/viewUserByIdController";
import { ViewUserController } from "./controllers/viewUserController";
import { ViewUserInactiveController } from "./controllers/viewUserInactiveController";
import { MysqlOrmUserRepository } from "./mysqlOrmUserRepository";
import UserModel from "./models/userModel";

export const userModel = new UserModel();
export const mysqlUserRespository= new MysqlOrmUserRepository(UserModel);
export const addUserUseCase= new AddUserUseCase(mysqlUserRespository);
export const addUserController= new AddUserController (addUserUseCase);

export const viewUserUseCase = new ViewUserUseCase(mysqlUserRespository);
export const viewUserController = new ViewUserController(viewUserUseCase);

export const viewUserByIdUseCase = new ViewUserByIdUseCase(mysqlUserRespository);
export const viewUserByIdController = new ViewUserByIdController(viewUserByIdUseCase);

export const viewUserInactiveUseCase = new ViewUserInactiveUseCase(mysqlUserRespository);
export const viewUserInactiveController = new ViewUserInactiveController(viewUserInactiveUseCase);

export const filterUsersUseCase = new FilterUsersUseCase(mysqlUserRespository);
export const filterUsersController = new FilterUsersController(filterUsersUseCase);

export const editUserUseCase = new EditUserUseCase(mysqlUserRespository);
export const editUserController = new EditUserController(editUserUseCase);

export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRespository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);

export const editPasswordUseCase = new EditPasswordUseCase(mysqlUserRespository);
export const editPasswordController = new EditPasswordController(editPasswordUseCase);

export const inactiveUserUseCase = new InactiveUserUseCase(mysqlUserRespository);
export const inactivateUserController = new InactivateUserController(inactiveUserUseCase);
