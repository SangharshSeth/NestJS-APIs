import { Controller, Post, Body } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Post()
  async setKey(@Body() redisData: { key: string; value: any }): Promise<any> {
    try {
      const result = await this.redisService.setKey(redisData);
      if (result === 'OK') {
        return {
          status: 'SUCCESS',
          message: 'Redis Set Successfully',
        };
      }
    } catch (error) {
      return error;
    }
  }
}
