import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private readonly client: RedisClientType;
  constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: 'redis-14300.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 14300,
      },
    });

    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }
  getClient() {
    return this.client;
  }
  async setKey(data: { key: string; value: string }): Promise<any> {
    try {
      const client = this.getClient();
      const clientRef = await client.connect();

      return await clientRef.set(data.key, data.value);
    } catch (error) {
      return error;
    }
  }
}
