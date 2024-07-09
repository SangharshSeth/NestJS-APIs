import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from './metrics.schema';
import { Repository } from 'typeorm';
import { LogDto } from 'src/dto/metric.dto';

export interface HealthCheck {
  status: string;
}

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricRepository: Repository<Metric>
  ) { }
  healthCheck(): HealthCheck {
    return {
      status: 'Services are up!',
    };
  }

  async insertLog(log: LogDto): Promise<any> {
    await this.metricRepository.insert(log)
  }
}
