import { BadRequestException, Injectable } from '@nestjs/common';
import * as quotes from '../../quotes.json';
import { CarInput } from './dto/car.input';
import { Quote } from './interfaces/quote.interface';

@Injectable()
export class InsuranceQuoteService {

	/**
	 * Find best insurance option with year value
	 * @param year: number
	 */
	public bestOptionPerYear(year: number): Quote[] {
		//Validate year
		if (year < 2000 && year > new Date().getDate()) {
			throw new BadRequestException("Number must be a valid year between 1990-Actual year")
		}
		//Group quotes
		const groupQuotes = this.groupByCoverageType(quotes);
		//find year results
		const yearGroup = this.findYear(year, groupQuotes);
		//Find best Price
		const groupTheBest = this.findBestPrice(yearGroup);

		return groupTheBest;
	}

	/**
	 * Find best options with car info
	 * @param car: CarInput
	 */
	public bestQuoteCar(car: CarInput){
		//Validate year
		if (car.year < 2000 && car.year > new Date().getDate()) {
			throw new BadRequestException("Number must be a valid year between 1990-Actual year")
		}
		//Group quotes
		const groupQuotes = this.groupByCoverageType(quotes);
		//find year filter results
		const yearGroup = this.findYear(car.year, groupQuotes);
		//find brand filter results
		const brandGroup = this.findBrand(car.brand, yearGroup);
		//console.log(brandGroup)
		//Find best Price
		const groupTheBest = this.findBestPrice(brandGroup, car.hasAC);

		return groupTheBest;
	}

	/**
	 * Reduce Json Quoutes to group by coverageType key
	 * @param list
	 */
	private groupByCoverageType(list: Array<Quote>): Object {
		const groupQuotes: Object = list.reduce((a, e) => {
			const key = e['coverageType'];
			if (!a[key]) {
				a[key] = [];
			}
			a[key].push(e);
			return a;
		}, {});
		return groupQuotes;
	}

	/**
	 * Filter categories by year range
	 * @param year
	 * @param list
	 */
	private findYear(year: number, list: Object) {
		const RC = list['RC'].filter((e) => {
			//Validate if has result between yearRange else return empty Array
			if (year >= Number(e.yearRange[0]) && year <= Number(e.yearRange[1])) {
				return e;
			}
		});
		const Low = list['Low'].filter((e) => {
			if (year >= Number(e.yearRange[0]) && year <= Number(e.yearRange[1])) {
				return e;
			}
		});
		const Mid = list['Mid'].filter((e) => {
			if (year >= Number(e.yearRange[0]) && year <= Number(e.yearRange[1])) {
				return e;
			}
		});
		const High = list['High'].filter((e) => {
			if (year >= Number(e.yearRange[0]) && year <= Number(e.yearRange[1])) {
				return e;
			}
		});

		return { RC: RC, Low: Low, Mid: Mid, High: High }
	}

	/**
	 * Filter categories by year range
	 * @param string
	 * @param list
	 */
	private findBrand(brand: string, list: Object) {
		const RC = list['RC'].filter((e) => {
			//Validate if has result between yearRange else return empty Array
			if (brand == e.brand) {
				return e;
			}
		});
		const Low = list['Low'].filter((e) => {
			if (brand == e.brand) {
				return e;
			}
		});
		const Mid = list['Mid'].filter((e) => {
			if (brand == e.brand) {
				return e;
			}
		});
		const High = list['High'].filter((e) => {
			if (brand == e.brand) {
				return e;
			}
		});

		return { RC: RC, Low: Low, Mid: Mid, High: High }
	}

	/**
	 * Find lower price for each category
	 * @param list
	 */
	private findBestPrice(list: Object, hasAC?: boolean): Quote[] | Array<any> {
		//init category
		let RC: Array<Quote> = [];
		//Validate has elements or return empty Object
		if (list['RC'].length > 0) {
			//Compare price values to get lower
			RC = list['RC'].reduce((a, e) => {
				//Remove comma from string to convert to number
				let pre = a.price.replace(',', '');
				let ac = e.price.replace(',', '');
				if(hasAC){
					let extraPre = a.extraCoveragePrice.replace(',', '');
					let extraAc = e.extraCoveragePrice.replace(',', '');
					pre = Number(pre) + Number(extraPre);
					ac = Number(ac) + Number(extraAc);
				};
				return Number(pre) < Number(ac) ? a : e;
			});
		}

		let Low: Array<Quote> = [];
		if (list['Low'].length > 0) {
			Low = list['Low'].reduce((a, e) => {
				let pre = a.price.replace(',', '');
				let ac = e.price.replace(',', '');
				if(hasAC){
					let extraPre = a.extraCoveragePrice.replace(',', '');
					let extraAc = e.extraCoveragePrice.replace(',', '');
					pre = Number(pre) + Number(extraPre);
					ac = Number(ac) + Number(extraAc);
				};
				return Number(pre) < Number(ac) ? a : e;
			});
		}

		let Mid: Array<Quote> = [];
		if (list['Mid'].length > 0) {
			Mid = list['Mid'].reduce((a, e) => {
				let pre = a.price.replace(',', '');
				let ac = e.price.replace(',', '');
				if(hasAC){
					let extraPre = a.extraCoveragePrice.replace(',', '');
					let extraAc = e.extraCoveragePrice.replace(',', '');
					pre = Number(pre) + Number(extraPre);
					ac = Number(ac) + Number(extraAc);
				};
				return Number(pre) < Number(ac) ? a : e;
			});
		}

		let High: Array<Quote> = [];
		if (list['High'].length > 0) {
			High = list['High'].reduce((a, e) => {
				let pre = a.price.replace(',', '');
				let ac = e.price.replace(',', '');
				if(hasAC){
					let extraPre = a.extraCoveragePrice.replace(',', '');
					let extraAc = e.extraCoveragePrice.replace(',', '');
					pre = Number(pre) + Number(extraPre);
					ac = Number(ac) + Number(extraAc);
				};
				return Number(pre) < Number(ac) ? a : e;
			});
		};

		return [RC, Low, Mid, High];
	}
}
