import { ICRUDModelQuerer } from '../Interfaces/ICRUDModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeTeam from '../database/models/SequelizeTeams';

export default class MatchModel implements IMatchModel, ICRUDModelQuerer<IMatch> {
  private model = SequelizeMatches;

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData
      .map(({ id,
        homeTeamId,
        homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }: IMatch) => (
        { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
      ));
  }

  async findByQuery(key: string, query: string | boolean) {
    const dbData = await this.model.findAll({
      where: { [key]: query },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData
      .map(({ id,
        homeTeamId,
        homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }: IMatch) => (
        { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
      ));
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(data);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async update(id: number, data: Partial<NewEntity<IMatch>>): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: IMatch['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
