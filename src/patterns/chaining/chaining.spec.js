import db from '../../../data/data'

// THE TASK IS TO...
// implement a micro-library that will allow devs to manipulate on the
// contents of a native JS object (being a key-value collection)

// that's how the code will be used like:
// withObj(exampleData)
//   .filterKeys(keyFilterFn)
//   .filterValues(valueFilterFn)
//   .mapKeys(keysMapFn)
//   .mapValues(valuesMapFn)
//   .distinctValues()
//   .take(count)
//   .reverse()
//   .value()

// withObj(obj) accepts an object and later on allows to manipulate on key-value pairs
// each operator then transforms

// IMPORTANT
// - hint: what is needed in order to support passing the state between step N and N+1?
// - you can choose between OOP and FP styles

// good luck ;-)

describe('Key-Value operations', () => {

	const formatNumber = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $';
	}

	const countryCodeToCountryName = db.getGeo()
	const isEuropean = (code) => code !== 'US'

	const exampleData = {
		US: 13926,
		DE: 913,
		FR: 5741,
		UK: 2927,
		NL: 6274,
		PL: 2927,
		ES: 158,
		IT: 8619,
	}

	describe('API', () => {
		it('.reverse() - replaces keys with values and vice versa', () => {
			const countryNameToCountryCode = withObj(countryCodeToCountryName)
				.reverse()
				.value()

			expect(countryNameToCountryCode).toEqual({
				'United States of America': 'US',
				'United Kingdom': 'UK',
				'Germany': 'DE',
				'France': 'FR',
				'Netherlands': 'NL',
				'Poland': 'PL',
				'Italy': 'IT',
				'Spain': 'ES',
			});
		});

		it('.take(c) - takes first `c` keys into the result', () => {
			const result = withObj(exampleData)
				.take(3)
				.value()

			expect(result).toEqual({
				US: 13926,
				DE: 913,
				FR: 5741,
			});
		});

		it('.distinctValues() - take only one pair key-value for a given value', () => {
			const result = withObj(exampleData)
				.distinctValues()
				.value()

			expect(result).toEqual({
				US: 13926,
				DE: 913,
				FR: 5741,
				UK: 2927,
				NL: 6274,
				ES: 158,
				IT: 8619,		
			});
		});

		it('.filterKeys(fn) - removes keys that don\'t pass the predicate', () => {
			const result = withObj(exampleData)
				.filterKeys(isEuropean)
				.value()

			expect(result).toEqual({
				DE: 913,
				FR: 5741,
				UK: 2927,
				NL: 6274,
				PL: 2927,
				ES: 158,
				IT: 8619,
			});
		});

		it('.filterValues(fn) - removes values that don\'t pass the predicate', () => {
			const result = withObj(exampleData)
				.filterValues((v) => v > 5000)
				.value()

			expect(result).toEqual({
				US: 13926,
				FR: 5741,
				NL: 6274,
				IT: 8619,
			});
		});

		it('.mapKeys(fn) - replaces keys with mapped keys, preserving values', () => {
			const result = withObj(exampleData)
				.mapKeys((k) => countryCodeToCountryName[k])
				.value()

			expect(result).toEqual({
				'United States of America': 13926,
				'Germany': 913,
				'France': 5741,
				'United Kingdom': 2927,
				'Netherlands': 6274,
				'Poland': 2927,
				'Spain': 158,
				'Italy': 8619,
			});
		});

		it('.mapValues(fn) - replaces values with mapped values, preserving keys', () => {
			const result = withObj(exampleData)
				.mapValues(formatNumber)
				.value()

			expect(result).toEqual({
				US: '13,926 $',
				DE: '913 $',
				FR: '5,741 $',
				UK: '2,927 $',
				NL: '6,274 $',
				PL: '2,927 $',
				ES: '158 $',
				IT: '8,619 $',
			});
		});
	});

	describe('chaining operations', () => {
		it('simple transformations', () => {
			const result = withObj(exampleData)
				.filterKeys(isEuropean)
				.filterValues((v) => v > 5000)
				.mapKeys((k) => countryCodeToCountryName[k])
				.mapValues(formatNumber)
				.value()

			expect(result).toEqual({
				'France': '5,741 $',
				'Netherlands': '6,274 $',
				'Italy': '8,619 $',
			});
		});

		it('nesting objects', () => {
			const result = withObj(exampleData)
				.mapValues((v, k) => ({
					value: formatNumber(v),
					european: isEuropean(k)
				}))
				.mapKeys((k) => countryCodeToCountryName[k])
				.value()

			expect(result).toEqual({
				'United States of America': { value: '13,926 $', european: false },
				'Germany': { value: '913 $', european: true },
				'France': { value: '5,741 $', european: true },
				'United Kingdom': { value: '2,927 $', european: true },
				'Netherlands': { value: '6,274 $', european: true },
				'Poland': { value: '2,927 $', european: true },
				'Spain': { value: '158 $', european: true },
				'Italy': { value: '8,619 $', european: true },
			});
		});
	});

});
