import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';

describe('WaterLogService', () => {
  let service: WaterLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterLogService],
    }).compile();

    service = module.get<WaterLogService>(WaterLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
