// implement fundamental operators in functional style:
// reduce, map, filter, forEach

describe('Functional Programming Fundamentals', () => {

	describe('reduce', () => {
		it('works according to specs', () => {
			const data = [1, 2, 3, 4, 5];

			// implement `reduce`

			// implement `sumReducer`
			let sumResult;
			expect(sumResult).toEqual(15);

			// implement `concatReducer`
			let concatResult;
			expect(concatResult).toEqual('1 2 3 4 5');
		});
	});

	describe('map', () => {
		it('works according to specs', () => {
			// implement `map`

			expect(map(a => a*2)([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);

			expect(map(a => '' + a)([1, 2, 3, 4, 5])).toEqual(['1', '2', '3', '4', '5']);
		});
	});

	describe('filter', () => {
		it('works according to specs', () => {
			// implement `filter`

			expect(filter(a => a % 2 === 0)([1, 2, 3, 4, 5])).toEqual([2, 4]);

			expect(filter(a => a <= 3)([1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
		});
	});

	describe('forEach', () => {
		it('works according to specs', () => {
			// implement `forEach`

			const spy1 = jasmine.createSpy()

			forEach(spy1)(['a', 'b', 'c', 'd'])
			expect(spy1).toHaveBeenCalledTimes(4);
			expect(spy1).toHaveBeenCalledWith('a', 0, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('b', 1, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('c', 2, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('d', 3, ['a', 'b', 'c', 'd']);
		});
	});
});
