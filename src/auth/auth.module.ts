import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google/google.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  providers: [AuthService, GoogleStrategy],
  controllers: [GoogleController],
})
export class AuthModule {}
