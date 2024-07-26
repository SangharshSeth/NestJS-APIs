import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './schema/session.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Session])]
})
export class SessionModule {}
