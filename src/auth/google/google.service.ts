import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GoogleState } from 'src/types/oauth';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        'https://1030-2404-8000-1005-37ac-24af-35ba-f9f6-a044.ngrok-free.app/google/redirect',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const state: GoogleState = JSON.parse(
      (request.query.state as string) ?? '{}',
    );

    request['googleState'] = {};
    request['googleState']['redirectTo'] = state.redirectTo;

    const { id, name, emails, photos } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, { ...user });
  }
}
