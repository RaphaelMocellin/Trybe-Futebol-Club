import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeamInfo } from '../Interfaces/teams/ITeamInfo';

export default class TeamInfo implements ITeamInfo {
  public name;

  // public teamId;

  public totalPoints = 0;

  public totalGames = 0;

  public totalVictories = 0;

  public totalDraws = 0;

  public totalLosses = 0;

  public goalsFavor = 0;

  public goalsOwn = 0;

  public goalsBalance = 0;

  public efficiency;

  constructor(teamName: string, teamId: number, matches: IMatch[]) {
    this.name = teamName;
    // this.teamId = teamId;
    this.calcAllStats(matches, teamId);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  private calcTotalPoints(matches: IMatch[], teamId: number) {
    return matches.forEach((match) => {
      if (match.homeTeamId === teamId) {
        this.totalGames += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) this.totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) this.totalPoints += 1;
      }
      if (match.awayTeamId === teamId) {
        this.totalGames += 1;
        if (match.awayTeamGoals > match.homeTeamGoals) this.totalPoints += 3;
        if (match.awayTeamGoals === match.homeTeamGoals) this.totalPoints += 1;
      }
    });
  }

  private calcTotalVictories(matches: IMatch[], teamId: number) {
    return matches.forEach((match) => {
      if (match.homeTeamId === teamId
        && match.homeTeamGoals > match.awayTeamGoals) this.totalVictories += 1;

      if (match.awayTeamId === teamId
        && match.awayTeamGoals > match.homeTeamGoals) this.totalVictories += 1;
    });
  }

  private calcTotalDraws(matches: IMatch[], teamId: number) {
    return matches.forEach((match) => {
      if (match.homeTeamId === teamId
        && match.homeTeamGoals === match.awayTeamGoals) this.totalDraws += 1;

      if (match.awayTeamId === teamId
        && match.awayTeamGoals === match.homeTeamGoals) this.totalDraws += 1;
    });
  }

  private calcTotalLosses(matches: IMatch[], teamId: number) {
    return matches.forEach((match) => {
      if (match.homeTeamId === teamId
        && match.homeTeamGoals < match.awayTeamGoals) this.totalLosses += 1;
      if (match.awayTeamId === teamId
        && match.awayTeamGoals < match.homeTeamGoals) this.totalLosses += 1;
    });
  }

  private calcGoalsFavor(matches: IMatch[], teamId: number) {
    matches.forEach((match) => {
      if (match.homeTeamId === teamId) this.goalsFavor += match.homeTeamGoals;
      if (match.awayTeamId === teamId) this.goalsFavor += match.awayTeamGoals;
    });
  }

  private calcGoalsOwn(matches: IMatch[], teamId: number) {
    matches.forEach((match) => {
      if (match.homeTeamId === teamId) this.goalsOwn += match.awayTeamGoals;
      if (match.awayTeamId === teamId) this.goalsOwn += match.homeTeamGoals;
    });
  }

  private calcAllStats(matches: IMatch[], teamId: number) {
    this.calcTotalPoints(matches, teamId);
    this.calcTotalVictories(matches, teamId);
    this.calcTotalDraws(matches, teamId);
    this.calcTotalLosses(matches, teamId);
    this.calcGoalsFavor(matches, teamId);
    this.calcGoalsOwn(matches, teamId);
  }
}
