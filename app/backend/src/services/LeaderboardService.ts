import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

// import ILeaderboard from '../Interfaces/leaderboards/ILeaderboard';

import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

// import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamInfo } from '../Interfaces/teams/ITeamInfo';
import TeamInfo from '../utils/TeamInfo';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
    private matchModel: MatchModel = new MatchModel(),

  ) {}

  private static sortLeaderboard(leaderboard: ITeamInfo[]): ITeamInfo[] {
    leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn,
    );

    return leaderboard;
  }

  public async getGeneralLeaderboard() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findByQuery('inProgress', false);

    const leaderboard = allTeams.map((team) => new TeamInfo(team.teamName, team.id, allMatches));

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }
}
