import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogController } from './water-log.controller';

describe('WaterLogController', () => {
  let controller: WaterLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLogController],
    }).compile();

    controller = module.get<WaterLogController>(WaterLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
