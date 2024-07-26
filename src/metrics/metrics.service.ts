import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogDto } from 'src/metrics/dto/metric.dto';
import { Repository } from 'typeorm';
import { Metric } from './metrics.schema';

export interface HealthCheck {
  status: string;
}

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricRepository: Repository<Metric>
  ) { }

  async insertLog(log: LogDto): Promise<any> {
    await this.metricRepository.insert(log)
  }
}
