import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', (req, res) => leaderboardController.getGeneralLeaderboard(req, res));
leaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));

export default leaderboardRouter;
