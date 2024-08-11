import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    email: string;
    username?: string;
    googleId: string;
    avatar?: string;
    accessToken?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findLoggedUser(user: any) {

    console.log("usrServ", user);

    return user;
  }

  async findUserInRoom(googleIds: string[]) {
    const users = await Promise.all(
      googleIds.map(async (googleId) => {
        return this.prisma.user.findFirst({
          where: {
            googleId: googleId,
          },
        });
      })
    );

    return users; // Return the array of users
  }

}
