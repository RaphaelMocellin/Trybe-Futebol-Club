import { Identifiable } from '..';

type team = {
  teamName: string
};

export interface IMatch extends Identifiable {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: team,
  awayTeam?: team,
}
