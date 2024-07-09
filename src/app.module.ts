import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from './metrics/metrics.module';
import { LoggerMiddleWare } from './middleware/logger';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './auth/auth.schema';
import { Session } from './session/session.schema';
import { Metric } from './metrics/metrics.schema';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MetricsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Sameer@123',
      database: 'development',
      entities: [User, Session, Metric],
      synchronize: true,
    }),
    AuthModule,
    RedisModule,
    SessionModule,
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
