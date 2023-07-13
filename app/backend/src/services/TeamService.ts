import TeamModel from '../models/TeamModel';
import { NewEntity } from '../Interfaces';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }

  public async createTeam(team: NewEntity<ITeams>): Promise<ServiceResponse<ITeams>> {
    const newTeam = await this.teamModel.create(team);
    return { status: 'SUCCESSFUL', data: newTeam };
  }

  public async updateTeam(id: number, team: ITeams): Promise<ServiceResponse<ServiceMessage>> {
    const teamFound = await this.teamModel.findById(id);
    if (!teamFound) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    const updatedTeam = await this.teamModel.update(id, team);
    if (!updatedTeam) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Team ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Team updated' } };
  }

  public async deleteTeam(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const teamFound = await this.teamModel.findById(id);
    if (!teamFound) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    await this.teamModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Team deleted' } };
  }
}
