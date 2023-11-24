import { Controller, Get } from '@nestjs/common';
import { HealthCheck, MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly MetricsService: MetricsService) {}

  @Get('/checkHealth')
  checkHealth(): HealthCheck {
    return this.MetricsService.healthCheck();
  }

  @Get('checkDatabaseHealth')
  checkDatabaseHealth(): string {
    return this.MetricsService.databaseCheck();
  }
}
