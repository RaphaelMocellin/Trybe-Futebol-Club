import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatch } from '../../Interfaces/matches/IMatch';

export default {
    up(queryInterface: QueryInterface) {
      return queryInterface.createTable<Model<IMatch>>('matches', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        homeTeamId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
              model: 'teams',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          homeTeamGoals: {
            allowNull: false,
            type: DataTypes.INTEGER
          },
          awayTeamId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
              model: 'teams', 
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          awayTeamGoals: {
            allowNull: false,
            type: DataTypes.INTEGER
          },
          inProgress: {
            allowNull: false,
            type: DataTypes.BOOLEAN
          },
      });
    },
  
    down(queryInterface: QueryInterface) {
      return queryInterface.dropTable('matches');
    },
  };