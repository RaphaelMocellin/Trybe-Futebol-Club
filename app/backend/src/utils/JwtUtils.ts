import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'xablau';

  sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  verify(token: string) {
    const onlyToken = token.split(' ');
    return jwt.verify(onlyToken[1], this.jwtSecret);
  }
}
