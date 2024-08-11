import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GoogleStrategy } from './auth/google/google.strategy';

import { MidtransService } from './midtrans/midtrans.service';

// import { SocketGateway } from './socket/socket.gateaway';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { GoogleController } from './auth/Google.Controller';

import { GoogleStrategy } from './auth/google/google.service';
import { MidtransController } from './midtrans/midtrans.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SocketService } from './socket/socket.service';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';

@Module({
  imports: [
    // MidtransModule.register({
    //   clientKey: process.env.MIDTRANS_CLIENT_KEY,
    //   serverKey: process.env.MIDTRANS_SERVER_KEY,
    //   merchantId: process.env.MIDTRANS_MERCHANT_ID,
    //   sandbox: true, // default: false,
    //   isGlobal: true, // default: false, register module globally
    // }),
    // SocketModule,
    PrismaModule,
  ],
  controllers: [AppController, MidtransController, GoogleController, UserController, QuizController],
  providers: [
    AppService,
    GoogleStrategy,
    MidtransService,
    SocketService,
    AuthService,
    // SocketGateway,
    PrismaService,
    PrismaClient,
    UserService,
    QuizService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'user/check',
        'user/user-avatar/:id',
        'user/getUser',
        'user/update-user/:id',
        'user/buy-avatar/:id',
        'payment/create',
        'users/logged',
        'startGame'
      );
  }
}
