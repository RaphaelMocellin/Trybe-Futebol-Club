import { Router } from 'express';
import teamRouter from './teams.routes';
import usersRouter from './users.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', usersRouter);
router.use('/login', authRouter);

export default router;
