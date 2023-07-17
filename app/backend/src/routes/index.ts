import { Router } from 'express';
import teamRouter from './teams.routes';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import matchRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', usersRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
