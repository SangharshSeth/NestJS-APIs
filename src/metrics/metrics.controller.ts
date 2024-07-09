import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthCheck, MetricsService } from './metrics.service';
import { LogDto } from 'src/dto/metric.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly MetricsService: MetricsService) {}

  @Get('health-check')
  checkHealth(): HealthCheck {
    return this.MetricsService.healthCheck();
  }


  @Post('create')
  insertLog(@Body() log: LogDto): any {
    return this.MetricsService.insertLog(log)
  }
}
