import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleAuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('logged')
  async logged(@Req() req: Request, @Res() res: Response) {
    const user = res.locals.user;

    const usr = await this.userService.findLoggedUser(user);

    res.status(200).json(usr);
  }

  @Get('in/room')
  async userInRoom(@Query('googleId') googleId: string[]) {
    console.log("pp", googleId);

    return this.userService.findUserInRoom(googleId);
  }
}
