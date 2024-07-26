import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schema/auth.schema';
import { Session } from '../session/schema/session.schema';
import { Metric } from 'src/metrics/metrics.schema';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session, Metric]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule]
})
export class AuthModule { }
