import { DataTypes, Model } from "sequelize";
import bcrypt from 'bcryptjs';
import sequelize from "../../../database/mysql";

interface UserModelAttributes {
    idUser: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    status: boolean;
}

class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
    readonly idUser!: number;
    readonly name!: string;
    readonly lastName!: string;
    readonly email!: string;
    readonly password!: string;
    readonly status!: boolean;
}

UserModel.init (
    {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        tableName: 'users',
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
    }
);

UserModel.beforeCreate(async (user : UserModel) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(user.password, salt);
        user.setDataValue('password', hashedPassword);

    }
});


export default UserModel;