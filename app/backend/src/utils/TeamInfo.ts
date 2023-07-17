import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeamInfo } from '../Interfaces/teams/ITeamInfo';

export default class TeamInfo implements ITeamInfo {
  public name;

  public teamId;

  public totalPoints = 0;

  public totalGames = 0;

  public totalVictories = 0;

  public totalDraws = 0;

  public totalLosses = 0;

  public goalsFavor = 0;

  public goalsOwn = 0;

  public goalsBalance = 0;

  public efficiency = 0;

  constructor(teamName: string, teamId: number, matches: IMatch[]) {
    this.name = teamName;
    this.teamId = teamId;
    this.totalGames = matches.length;
    this.calcAllStats(matches);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = Number(((this.totalPoints / (matches.length * 3)) * 100).toFixed(2));
  }

  private calcTotalPoints(matches: IMatch[]) {
    return matches.forEach((match) => {
      if (match.homeTeamId === this.teamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) this.totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) this.totalPoints += 1;
      }
      if (match.awayTeamId === this.teamId) {
        if (match.awayTeamGoals > match.homeTeamGoals) this.totalPoints += 3;
        if (match.awayTeamGoals === match.homeTeamGoals) this.totalPoints += 1;
      }
    });
  }

  private calcTotalVictories(matches: IMatch[]) {
    return matches.forEach((match) => {
      if (match.homeTeamId === this.teamId
        && match.homeTeamGoals > match.awayTeamGoals) this.totalVictories += 1;

      if (match.awayTeamId === this.teamId
        && match.awayTeamGoals > match.homeTeamGoals) this.totalVictories += 1;
    });
  }

  private calcTotalDraws(matches: IMatch[]) {
    return matches.forEach((match) => {
      if (match.homeTeamId === this.teamId
        && match.homeTeamGoals === match.awayTeamGoals) this.totalDraws += 1;

      if (match.awayTeamId === this.teamId
        && match.awayTeamGoals === match.homeTeamGoals) this.totalDraws += 1;
    });
  }

  private calcTotalLosses(matches: IMatch[]) {
    return matches.forEach((match) => {
      if (match.homeTeamId === this.teamId
        && match.homeTeamGoals < match.awayTeamGoals) this.totalLosses += 1;
      if (match.awayTeamId === this.teamId
        && match.awayTeamGoals < match.homeTeamGoals) this.totalLosses += 1;
    });
  }

  private calcGoalsFavor(matches: IMatch[]) {
    matches.forEach((match) => {
      if (match.homeTeamId === this.teamId) this.goalsFavor += match.homeTeamGoals;
      if (match.awayTeamId === this.teamId) this.goalsFavor += match.awayTeamGoals;
    });
  }

  private calcGoalsOwn(matches: IMatch[]) {
    matches.forEach((match) => {
      if (match.homeTeamId === this.teamId) this.goalsOwn += match.awayTeamGoals;
      if (match.awayTeamId === this.teamId) this.goalsOwn += match.homeTeamGoals;
    });
  }

  private calcAllStats(matches: IMatch[]) {
    this.calcTotalPoints(matches);
    this.calcTotalVictories(matches);
    this.calcTotalDraws(matches);
    this.calcTotalLosses(matches);
    this.calcGoalsFavor(matches);
    this.calcGoalsOwn(matches);
  }
}
