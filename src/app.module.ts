import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/schema/auth.schema';
import { AuthService } from './auth/auth.service';
import { LoggerMiddleWare } from './common/middleware/logger';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import * as process from 'node:process';
import { Session } from './session/schema/session.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // Use environment variable
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Session],
      synchronize: true,
    }),
    AuthModule,
    RedisModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
