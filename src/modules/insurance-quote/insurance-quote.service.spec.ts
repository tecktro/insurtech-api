import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceQuoteService } from './insurance-quote.service';

describe('InsuranceQuoteService', () => {
  let service: InsuranceQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceQuoteService],
    }).compile();

    service = module.get<InsuranceQuoteService>(InsuranceQuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
