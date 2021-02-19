import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceQuoteController } from './insurance-quote.controller';

describe('InsuranceQuoteController', () => {
  let controller: InsuranceQuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceQuoteController],
    }).compile();

    controller = module.get<InsuranceQuoteController>(InsuranceQuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
