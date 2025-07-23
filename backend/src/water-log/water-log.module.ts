import { Module } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { WaterLogController } from './water-log.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Adjust the import path as necessary

@Module({
  imports: [PrismaModule],
  providers: [WaterLogService],
  controllers: [WaterLogController]
})
export class WaterLogModule {}
