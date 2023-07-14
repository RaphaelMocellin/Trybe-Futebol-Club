import { Router } from 'express';
import teamRouter from './teams.routes';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import matchRouter from './matches.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', usersRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter);

export default router;
