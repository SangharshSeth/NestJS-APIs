import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MetricsModule } from './metrics/metrics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleWare } from './middleware/logger';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    MetricsModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
