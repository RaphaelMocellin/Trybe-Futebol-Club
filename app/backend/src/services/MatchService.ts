import MatchModel from '../models/MatchModel';
// import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByQuery(
    key: string,
    query: string | boolean,
  ): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByQuery(key, query);
    return { status: 'SUCCESSFUL', data: matches as IMatch[] };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.create(match);
    return { status: 'SUCCESSFUL', data: newMatch };
  }

  public async updateMatch(id: number, match: IMatch): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const updatedMatch = await this.matchModel.update(id, match);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async deleteMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    await this.matchModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Match deleted' } };
  }
}
