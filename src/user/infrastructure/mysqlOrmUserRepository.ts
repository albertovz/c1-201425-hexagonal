import { UserRepository } from "../domain/repository/userRepository";
import UserModel from "./models/userModel";

export class MysqlOrmUserRepository implements UserRepository {
    constructor (private readonly userModel : typeof UserModel) {}

    async getAllUser(): Promise<UserModel[]> {
        try {
          const users = await this.userModel.findAll();
          return users;
        } catch (error) {
          console.error("Error al obtener todos los usuarios:", error);
          return [];
        }
      }
    
      async getUserById(userId: number): Promise<UserModel | null> {
        try {
          const user = await this.userModel.findByPk(userId);
          return user;
        } catch (error) {
          console.error(`Error al obtener el usuario con ID ${userId}:`, error);
          return null;
        }
      }
    
      async getInactiveUser(): Promise<UserModel[] | null> {
        try {
          const inactiveUsers = await this.userModel.findAll({
            where: {
              status: false,
            },
          });
          return inactiveUsers;
        } catch (error) {
          console.error("Error al obtener usuarios inactivos:", error);
          return [];
        }
      }
    
      async createUser(user: UserModel): Promise<UserModel> {
        try {
          const newUser = await this.userModel.create(user);
          return newUser;
        } catch (error) {
          console.error("Error al crear el usuario:", error);
          throw error;
        }
      }
    
      async filterUsersByNameAndEmail(name: string, email: string): Promise<UserModel[] | null> {
        try {
          const filteredUsers = await this.userModel.findAll({
            where: {
              name,
              email
            },
          });
          return filteredUsers;
        } catch (error) {
          console.error('Error al filtrar usuarios por nombre, correo electrónico y celular:', error);
          return null;
        }
      }
    
      async filterUsersByName(name: string): Promise<UserModel[] | null> {
        try {
          const filteredUsers = await this.userModel.findAll({
            where: {
              name,
            },
          });
          return filteredUsers;
        } catch (error) {
          console.error('Error al filtrar usuarios por nombre:', error);
          return null;
        }
      }
    
      async filterUsersByEmail(email: string): Promise<UserModel[] | null> {
        try {
          const filteredUsers = await this.userModel.findAll({
            where: {
              email,
            },
          });
          return filteredUsers;
        } catch (error) {
          console.error('Error al filtrar usuarios por correo electrónico:', error);
          return null;
        }
      }
    
      async updateUser(idUser: number, updatedUser: UserModel): Promise<UserModel | null> {
        try {
          const [affectedRows] = await this.userModel.update(updatedUser, {
            where: { idUser },
          });
    
          if (affectedRows === 0) {
            return null; 
          }
    
          const updatedUserData = await this.userModel.findByPk(idUser);
          return updatedUserData;
        } catch (error) {
          console.error(`Error al actualizar el usuario con ID ${idUser}:`, error);
          return null;
        }
      }
    
      async deleteUser(idUser: number): Promise<boolean> {
        try {
          const user = await this.userModel.findByPk(idUser);
    
          if (!user) {
            return false; 
          }
          await user.destroy();
          return true; 
        } catch (error) {
          console.error(`Error al eliminar el usuario con ID ${idUser}:`, error);
          return false; 
        }
      }
    
      async updatePassword(idUser: number, newPassword: string): Promise<boolean> {
        try {
          const [updatedRowCount] = await this.userModel.update(
            { password: newPassword },
            {
              where: { idUser },
            }
          );
    
          return updatedRowCount > 0;
        } catch (error) {
          console.error(`Error al actualizar la contraseña del usuario con ID ${idUser}:`, error);
          return false;
        }
      }
    
      async inactiveUser(idUser: number): Promise<boolean> {
        try {
          const user = await this.userModel.findByPk(idUser);
    
          if (!user) {
            return false; 
          }
          await user.update({ status: false });
          return true; 
        } catch (error) {
          console.error(`Error al inactivar usuario con ID ${idUser}:`, error);
          return false;
        }
      }
}