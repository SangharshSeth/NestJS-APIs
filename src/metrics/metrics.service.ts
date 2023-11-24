import { Injectable } from '@nestjs/common';

export interface HealthCheck {
  status: string;
}

@Injectable()
export class MetricsService {
  healthCheck(): HealthCheck {
    return {
      status: 'Services are up!',
    };
  }

  databaseCheck(): string {
    return 'Hi';
  }
}
