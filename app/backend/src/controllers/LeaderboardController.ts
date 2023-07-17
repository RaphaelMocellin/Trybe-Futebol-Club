import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderBoardService = new LeaderboardService(),
  ) { }

  public async getGeneralLeaderboard(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderBoardService.getGeneralLeaderboard();
    return res.status(200).json(serviceResponse);
  }
}
