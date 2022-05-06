import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Chapter extends Model {
  public id!: number;
  public order!: number;
  public title: string;
  public content: string;
}

export const ChapterMap = (sequelize: Sequelize) => {
  Chapter.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'chapters',
      timestamps: false,
    }
  );
  Chapter.sync({ logging: false });
};
