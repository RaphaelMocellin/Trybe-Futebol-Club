import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
