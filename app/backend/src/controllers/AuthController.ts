import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import JwtUtils from '../utils/JwtUtils';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import UserModel from '../models/UserModel';

export default class AuthController {
  private jwtUtils = new JwtUtils();

  private model: UserModel = new UserModel();

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = this.jwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }

  async getRole(req: Request, res: Response) {
    const { id } = res.locals;
    const user = await this.model.findById(id) as IUser;

    return res.status(200).json({
      role: user.role,
    });
  }
}
