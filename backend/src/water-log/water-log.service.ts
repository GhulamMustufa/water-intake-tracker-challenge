import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(userId: string, date: string, intakeMl: number) {
    return this.prisma.waterLog.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date(date),
        },
      },
      update: {
        intakeMl,
      },
      create: {
        userId,
        date: new Date(date),
        intakeMl,
      },
    });
  }

  async getWeeklySummary(userId: string) {
    const query = `
      SELECT 
        date,
        intakeMl as totalIntake,
        (intakeMl / 2000.0) * 100 as percentageOfGoal
      FROM WaterLog
      WHERE userId = ?
      ORDER BY date DESC
      LIMIT 7
    `;
    
    return this.prisma.$queryRawUnsafe(query, userId);
  }

  async getAllLogs() {
    return this.prisma.waterLog.findMany({
      orderBy: { date: 'desc' },
    });
  }
}