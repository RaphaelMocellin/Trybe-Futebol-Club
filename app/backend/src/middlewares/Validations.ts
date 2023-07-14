import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';
import { ILogin } from '../Interfaces/users/IUser';
import JwtUtils from '../utils/JwtUtils';

class Validations {
  private static passwordMinLength = 6;

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

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    const jwtUtils = new JwtUtils();
    const decodedToken = jwtUtils.verify(authorization);

    if (!decodedToken) {
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }

    next();
  }
}

export default Validations;
