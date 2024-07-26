import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HealthCheck, MetricsService } from './metrics.service';
import { LogDto } from 'src/metrics/dto/metric.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly MetricsService: MetricsService) { }

  @UseGuards(AuthGuard)
  @Get('health-check')
  checkHealth(): HealthCheck {
    return {
      status: 'OK',
    }
  }
  
  @Post('create')
  insertLog(@Body() log: LogDto): any {
    return this.MetricsService.insertLog(log)
  }
}
