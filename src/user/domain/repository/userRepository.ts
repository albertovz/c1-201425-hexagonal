import UserModel from "../../infrastructure/models/userModel";

export interface UserRepository {

    getAllUser(): Promise<UserModel[] | null>;
    createUser(user: UserModel): Promise<UserModel|null>;
    getUserById(idUser: number): Promise<UserModel|null>;
    getInactiveUser(): Promise<UserModel[]| null>;
    filterUsersByNameAndEmail(name: string, email: string): Promise<UserModel[] | null>;
    filterUsersByName(name: string):  Promise<UserModel[] | null>;
    filterUsersByEmail(email: string):  Promise<UserModel[] | null>;
    updateUser(idUser: number, updatedUser: UserModel): Promise<UserModel | null>;
    deleteUser(idUser: number): Promise<boolean>;
    updatePassword(idUser: number, newPassword: string): Promise<boolean>;
    inactiveUser(idUser: number): Promise<boolean>;
    
}