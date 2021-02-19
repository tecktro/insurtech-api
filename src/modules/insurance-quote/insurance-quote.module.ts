import { Module } from '@nestjs/common';
import { InsuranceQuoteController } from './insurance-quote.controller';
import { InsuranceQuoteService } from './insurance-quote.service';

@Module({
  controllers: [InsuranceQuoteController],
  providers: [InsuranceQuoteService]
})
export class InsuranceQuoteModule {}
