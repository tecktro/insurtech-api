import { BadRequestException, Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { InsuranceQuoteService } from './insurance-quote.service';
import { Quote } from './interfaces/quote.interface';

@Controller()
export class InsuranceQuoteController {

	constructor(
		private insuranceService: InsuranceQuoteService
	) { }

	/**
	 * Find best insurance options per param
	 * @param year
	 */
	@Post('bestOptionPerYear')
	findPerYear(@Body('year', ParseIntPipe) year: number): Quote[] {
		return this.insuranceService.bestOptionPerYear(year);
	}

}
