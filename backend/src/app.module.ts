import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterLogModule } from './water-log/water-log.module';

@Module({
  imports: [WaterLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
