import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MetricsModule } from './metrics/metrics.module';
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerMiddleWare } from './middleware/logger';

@Module({
  imports: [
    UsersModule,
    MetricsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Sangharsh:NsOMe5Dk061J8m1l@mastercluster.dv0dfsb.mongodb.net/?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}

