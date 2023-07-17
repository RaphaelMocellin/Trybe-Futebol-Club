import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', (req, res) => leaderboardController.getGeneralLeaderboard(req, res));

export default leaderboardRouter;
