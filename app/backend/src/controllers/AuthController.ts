import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import JwtUtils from '../utils/JwtUtils';
import { ILogin } from '../Interfaces/users/IUser';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class AuthController {
  private jwtUtils = new JwtUtils();
  private model: UserModel = new UserModel();

  constructor(
    private userService = new UserService(),
  ) { }

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

  async getRole(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals.decodedToken;

    console.log(res.locals.decodedToken);

    const serviceResponse = await this.userService.findById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json({
      role: serviceResponse.data.role,
    });
  }
}
