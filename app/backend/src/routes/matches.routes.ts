import { Router } from 'express';
import Validations from '../middlewares/Validations';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.getAllMatches(req, res));
matchRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req, res) => matchController.finishMatch(req, res),
);

export default matchRouter;
