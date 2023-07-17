import { Request, Response } from 'express';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new UserService(),
  ) { }

  public async getGeneralLeaderboard(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getGeneralLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }
}
