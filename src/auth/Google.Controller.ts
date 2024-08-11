import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './auth.guard';
import { GoogleState } from './google/google-state.decorator';
import { AuthService } from './auth.service';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @GoogleState('redirectTo') redirectTo: string,
  ) {
    const user = req.user as any; // Ambil data pengguna dari req.user

    res.locals.googleId = user.googleId;

    // Redirect ke URL yang diinginkan dengan accessToken sebagai query parameter
    const accessToken = user?.accessToken;
    res.redirect(`${redirectTo}?accessToken=${accessToken}`);

    console.log("acsTkn", accessToken);

    // Simpan data pengguna ke database
    await this.authService.googleLogin(user, req, res);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt')) // Pastikan hanya pengguna yang sudah diautentikasi yang bisa mengakses endpoint ini
  async getUser(@Req() req: Request) {
    const user = req.user as any; // Ambil data pengguna dari req.user
    return user;
  }
}
