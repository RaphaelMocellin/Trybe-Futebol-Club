import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';
import { ILogin } from '../Interfaces/users/IUser';
import JwtUtils from '../utils/JwtUtils';
import SequelizeTeam from '../database/models/SequelizeTeams';

class Validations {
  private static passwordMinLength = 6;

  private static teamModel = SequelizeTeam;

  //   static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
  //     const book = req.body;
  //     const requiredKeys = ['title', 'price', 'author', 'isbn'];
  //     const notFoundKey = requiredKeys.find((key) => !(key in book));
  //     if (notFoundKey) {
  //       return res.status(400).json({ message: `${notFoundKey} is required` });
  //     }
  //     next();
  //   }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    return next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({
          message: 'Token not found',
        });
      }

      const jwtUtils = new JwtUtils();
      const decodedToken = jwtUtils.verify(authorization);
      res.locals.decodedToken = decodedToken;

      return next();
    } catch {
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }
  }

  static async validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const verifyTeam01 = await Validations.teamModel.findByPk(homeTeamId);
    const verifyTeam02 = await Validations.teamModel.findByPk(awayTeamId);
    console.log('team01', verifyTeam01);
    console.log('team02', verifyTeam02);

    if (!verifyTeam01 || !verifyTeam02) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    return next();
  }
}

export default Validations;
