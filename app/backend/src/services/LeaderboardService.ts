import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

import ILeaderboard from '../Interfaces/leaderboards/ILeaderboard';

import { NewEntity } from '../Interfaces';

import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';

import { IMatch } from '../Interfaces/matches/IMatch';

import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class leaderboardService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  public async getGeneralLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findByQuery('inProgress', false);
  }
}
