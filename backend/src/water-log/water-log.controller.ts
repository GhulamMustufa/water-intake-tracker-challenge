import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';

@Controller('water-log')
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post()
  async logWaterIntake(
    @Body() body: { userId: string; date: string; intakeMl: number },
  ) {
    return this.waterLogService.upsertWaterLog(
      body.userId,
      body.date,
      body.intakeMl,
    );
  }

  @Get('summary/:userId')
  async getWeeklySummary(@Param('userId') userId: string) {
    return this.waterLogService.getWeeklySummary(userId);
  }

  @Get('all')
  getAllLogs() {
    return this.waterLogService.getAllLogs();
  }
}