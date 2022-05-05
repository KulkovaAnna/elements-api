import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Character extends Model {
  public id!: number;
  public name?: string;
  public description?: string;
  public story?: string;
  public hero_image?: string;
  public images?: string[];
  public full_name?: string;
  public race?: string;
}

export const CharacterMap = (sequelize: Sequelize) => {
  Character.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.TEXT('medium'),
      },
      story: {
        type: DataTypes.TEXT('long'),
      },
      hero_image: {
        type: DataTypes.STRING(),
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING()),
        defaultValue: [],
      },
      full_name: {
        type: DataTypes.STRING(255),
      },
      race: {
        type: DataTypes.ENUM('elf', 'human', 'goblin', 'siren', 'verwolf'),
      },
    },
    {
      sequelize,
      tableName: 'characters',
      timestamps: false,
    }
  );
  Character.sync();
};
