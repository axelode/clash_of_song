import { Body, Injectable, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  async googleLogin(user: any, req: Request, res: Response) {
    const { email, firstName, lastName, picture, googleId } = user;
    console.log(res.locals.googleId);

    return this.prisma.user.upsert({
      where: { googleId: googleId },
      update: {
        email: email,
        username: `${firstName}_${lastName}`,
        avatar: picture,
        updateAt: new Date(),
      },
      create: {
        googleId: googleId,
        email: email,
        username: `${firstName}_${lastName}`,
        avatar: picture,
        createdAt: new Date(),
        updateAt: new Date(),
      },
    });
  }
}
