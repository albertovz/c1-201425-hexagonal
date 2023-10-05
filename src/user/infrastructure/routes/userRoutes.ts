import authenticateMiddleware from '../../../middlewares/authentication';
import express from 'express';
import { addUserController, viewUserController, viewUserByIdController, viewUserInactiveController, filterUsersController, editUserController, deleteUserController, editPasswordController, inactivateUserController } from '../dependencies';


export const userRouter = express.Router();

userRouter.post("/", 
addUserController.createUser.bind(addUserController));

userRouter.get("/", authenticateMiddleware,
viewUserController.getAllUser.bind(viewUserController));

userRouter.get("/:idUser", authenticateMiddleware,
viewUserByIdController.getUserById.bind(viewUserByIdController));

userRouter.get("/inactive/status", authenticateMiddleware,
viewUserInactiveController.getInactiveUser.bind(viewUserInactiveController));

userRouter.get("/filter/NameOrEmail",authenticateMiddleware,
filterUsersController.filterUsersByNameAndEmail.bind(filterUsersController));

userRouter.put('/:idUser', authenticateMiddleware,
editUserController.updateUser.bind(editUserController));

userRouter.delete('/:idUser', authenticateMiddleware,
deleteUserController.deleteUser.bind(deleteUserController));

userRouter.put("/:idUser/newPassword",authenticateMiddleware,
editPasswordController.updatePassword.bind(editPasswordController));

userRouter.put("/:idUser/inactivate", authenticateMiddleware,
inactivateUserController.inactivateUser.bind(inactivateUserController));