import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../database/mysql';

interface ReviewModelAttributes {
  idReview: number;
  comment: string;
  status: boolean;
  idUser: number; 
  idBook: number; 
 
}

class ReviewModel extends Model<ReviewModelAttributes> implements ReviewModelAttributes {
  readonly idReview!: number;
  readonly comment!: string;
  readonly status!: boolean;
  readonly idUser!: number; 
  readonly idBook!: number; 
}

ReviewModel.init(
  {
    idReview: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
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
    tableName: 'reviews', 
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt', 
    deletedAt: 'deletedAt',
  }
);

export { ReviewModel }