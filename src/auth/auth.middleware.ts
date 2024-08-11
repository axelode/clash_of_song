import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private client: OAuth2Client;

  constructor(private readonly userService: UserService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer')) {
      return res.sendStatus(401);
    }

    const token = headers && headers.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }
    console.log('token', token);
    try {
      const ticket = await this.client.getTokenInfo(token);
      const email = ticket.email;
      const user = await this.userService.findOneByEmail(email);
      res.locals.user = user;
      console.log('user middleware', user);

      next();
    } catch (error) {
      console.error('Error verifikasi token:', error);
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}
