import { Body, Controller, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CarInput } from './dto/car.input';
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

	/**
	 * Find best option by data car
	 * @param car
	 */
	@Post('quoteCar')
	findQuoteCar(@Body(new ValidationPipe()) car: CarInput) {
		return this.insuranceService.bestQuoteCar(car);
	}

}
