import { customMatchers } from '../../matchers';
import { shoppingData, ShoppingItemWithId } from '../../../data/shopping';

// IMPORTANT (!)
// use reducers in all tasks
// don't use FOR loops

describe('Reducers', () => {
	it('can accumulate a collection down to a single value', () => {
		// (!) FIND A BUG, fix it to make the test pass

		// calculate total cost of above shopping cart
		const totalPrice = shoppingData.reduce((total, item) => {
			return total += item.qty * item.price;
		});

		expect(totalPrice).toEqual(159.45);
	});

	describe('logical reducers', () => {
		// define a common type for all functions below

		let isEven = n => n % 2 === 0;
		let isOdd = n => n % 2 === 1;
		let isGT10 = n => n > 10;
		let isLT1000 = n => n < 1000;
		let isBetween20And50 = n => n >= 20 && n <= 50;
		let isPositive = n => n > 0;
		let isNegative = n => n < 0;

		it('can check if all predicates are truthy', () => {
			// write the function `allTruthy` that will check if
			// 1. for a given value
			// 2. all predicates are truthy (all functions for this value return true) 

			// function allTruthy(value, predicates)...

			expect(allTruthy(0, [isEven, isLT1000])).toBe(true);
			expect(allTruthy(25, [isOdd, isGT10, isNegative])).toBe(false);
			expect(allTruthy(32, [isOdd, isBetween20And50, isLT1000])).toBe(false);
			expect(allTruthy(-1, [isEven, isOdd, isNegative])).toBe(false);
			expect(allTruthy(-1, [isNegative])).toBe(true);
		});

		it('can check if any predicate is truthy', () => {
			// write the function `anyTruthy` that will check if
			// 1. for a given value
			// 2. at least one predicates is truthy (at least one function returns true for this value) 

			// function anyTruthy(value, predicates)...

			expect(anyTruthy(0, [isOdd, isNegative])).toBe(false);
			expect(anyTruthy(25, [isEven, isBetween20And50, isNegative])).toBe(true);
			expect(anyTruthy(32, [isEven, isBetween20And50, isLT1000])).toBe(true);
			expect(anyTruthy(-1, [isEven, isBetween20And50, isPositive])).toBe(false);
			expect(anyTruthy(-1, [isNegative])).toBe(true);
		});
	});

	it('sequential processing via function pipe', () => {
		// start - is a starting value
		// operations - is a sequence of operations, output of step n is an input of step n+1
		// write the execute function which accepts function sequence and the starting value
		// and returns the value processed by piping via function sequence

		// don't use FOR loops

		// function execute...

		var start = 2;
		var operations = [
			function(a){ return 8 * a - 10; },
			function(a){ return (a - 3) * (a - 3) * (a - 3); },
			function(a){ return a * a + 4; },
			function(a){ return a % 5; }
		];
		var result = execute(operations, start);
		expect(result).toEqual(3);

		var start = 5;
		var operations = [
			function(a){ return (a - 3) * (a - 3) * (a - 3); },
			function(a){ return 8 * a - 10; },
			function(a){ return a * a + 4; }
		];
		var result = execute(operations, start);
		expect(result).toEqual(2920);
	});

	describe('algorithms', () => {
		beforeEach(() => {
			jasmine.addMatchers(customMatchers);
		});

		it('gimmePairs function', () => {
			// write function `gimmePairs` which accepts dynamic number of parameters
			// and returns an array of all possible pairs

			let gimmePairs;

			expect(gimmePairs(1)).toEqualJSON([]);
			expect(gimmePairs(1, 2)).toEqualJSON([[1, 2]]);
			expect(gimmePairs(1, 2, 3)).toEqualJSON([[1, 2], [2, 3], [1, 3]]);
			expect(gimmePairs(1, 2, 3, 4)).toEqualJSON([[1, 2], [2, 3], [3, 4], [1, 3], [2, 4], [1, 4]]);
		});
	});
});
