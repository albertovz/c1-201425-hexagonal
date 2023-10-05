import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../database/mysql';

interface LoanModelAttributes {
  idLoan: number;
  deliverDate: string;
  loanDate: string;
  status: boolean;
  idUser: number; 
  idBook: number; 
 
}

class LoanModel extends Model<LoanModelAttributes> implements LoanModelAttributes {
  readonly idLoan!: number;
  readonly deliverDate!: string;
  readonly loanDate!: string;
  readonly status!: boolean;
  readonly idUser!: number; 
  readonly idBook!: number; 
}

LoanModel.init(
  {
    idLoan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deliverDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loanDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idBook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize,
    tableName: 'loans', 
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt', 
    deletedAt: 'deletedAt',
  }
);

export { LoanModel }