import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../database/mysql';
import { LoanModel } from '../../../loan/domain/models/loanModel';
import { ReviewModel } from '../../../review/infrastructure/models/reviewModel';

interface BookModelAttributes {
  idBook: number;
  title: string;
  folio: string;
  author: string;
  editionNumber: string;
  description: string;
  status: boolean;
}

class BookModel extends Model<BookModelAttributes> implements BookModelAttributes {
  readonly idBook!: number;
  readonly title!: string;
  readonly folio!: string;
  readonly author!: string;
  readonly editionNumber!: string;
  readonly description!: string;
  readonly status!: boolean;
}

BookModel.init(
  {
    idBook: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El título es obligatorio.',
        },
      },
    },
    folio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El folio es obligatorio.',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El autor es obligatorio.',
        },
      },
    },
    editionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El número de edición es obligatorio.',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La descripción es obligatoria.',
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, 
  {
    sequelize,
    tableName: 'books', 
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  }
);

BookModel.hasMany(ReviewModel, { foreignKey: 'idBook', as: 'reviews' });
BookModel.hasMany(LoanModel, { foreignKey: 'idBook', as: 'loans' });

export { BookModel };
