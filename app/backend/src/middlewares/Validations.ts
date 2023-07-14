import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';
import { ILogin } from '../Interfaces/users/IUser';

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
    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'All fields must be filled',
      });
    }

    next();
  }
}

export default Validations;
