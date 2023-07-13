import { NewEntity } from '../Interfaces';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import SequelizeTeam from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class BookModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async create(data: NewEntity<ITeams>): Promise<ITeams> {
    const dbData = await this.model.create(data);

    const { id, teamName }: ITeams = dbData;
    return { id, teamName };
  }

  async update(id: ITeams['id'], data: Partial<NewEntity<ITeams>>): Promise<ITeams | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: ITeams['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
